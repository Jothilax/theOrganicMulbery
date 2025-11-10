// import Order from "./order.model.js";
// import OrderItem from "./oderItem.model.js";
import Cart from "../cart/cart.model.js";
// import Product from "../products/product.model.js";
// import { sequelize } from "../config/db.js";
import sequelize from "../../config/db.js";
import { Customer, Order, OrderItem, Product} from '../associations/index.js'

/**
 * Create an order from the logged-in user's cart.
 * Steps:
 *  - fetch cart items & validate
 *  - compute total
 *  - create order within a transaction
 *  - create order items (snapshot price)
 *  - clear cart
 */
export const createOrderFromCart = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.customer.id; // ✅ changed from req.user.id
    const { payment_method = "COD", address = "" } = req.body;

    // Fetch cart items with product details
    const cartItems = await Cart.findAll({
      where: { cust_id: userId }, // ✅ change user_id -> cust_id
      include: [Product],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!cartItems || cartItems.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    const orderItemsPayload = [];

    for (const ci of cartItems) {
      const product = ci.Product;
      if (!product) throw new Error(`Product not found: ${ci.product_id}`);

      const price = Number(product.price) || 0;
      const qty = Number(ci.quantity);
      total += price * qty;

      orderItemsPayload.push({
        product_id: product.id,
        quantity: qty,
        price,
      });
    }

    // Create order
    const order = await Order.create(
      {
        user_id: userId,
        total_amount: total,
        payment_method,
        address,
        created_by: userId,
        updated_by: userId,
      },
      { transaction: t }
    );

    // Create order items
    const itemsToCreate = orderItemsPayload.map((it) => ({ ...it, order_id: order.id }));
    await OrderItem.bulkCreate(itemsToCreate, { transaction: t });

    // Clear user's cart
    await Cart.destroy({ where: { cust_id: userId }, transaction: t }); // ✅ change user_id -> cust_id

    await t.commit();
    return res.status(201).json({
      message: "Order created",
      order: { id: order.id, total_amount: order.total_amount },
    });
  } catch (err) {
    await t.rollback();
    console.error(err);
    return res.status(500).json({ message: "Failed to create order", error: err.message });
  }
};

/**
 * Get orders for logged-in user (with order items)
 */
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.customer.id; // ✅ changed from req.user.id
    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [
        { model: OrderItem, as: "items", include: [{ model: Product, as: "product" }] },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};
