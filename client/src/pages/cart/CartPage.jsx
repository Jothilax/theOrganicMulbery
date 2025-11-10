import React, { useState } from "react";
import "./CartPage.css";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Gold Necklace",
      image: "https://via.placeholder.com/150",
      price: 25000,
      quantity: 1,
    },
    {
      id: 2,
      name: "Diamond Ring",
      image: "https://via.placeholder.com/150",
      price: 48000,
      quantity: 2,
    },
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax - discount;

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode === "SAVE10") {
      setDiscount(subtotal * 0.1);
      alert("Coupon applied! 10% off");
    } else {
      alert("Invalid coupon");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add some items to your cart to continue shopping.</p>
        <Link to="/collection" className="cart-btn">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-content">
        {/* Cart Items */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-card">
              <img src={item.image} alt={item.name} />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>₹{item.price.toLocaleString()}</p>
                <p>Qty: {item.quantity}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemove(item.id)}
              >
                ✖
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-item">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="summary-item">
            <span>Tax (5%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="summary-item discount">
              <span>Discount</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
          )}

          <hr />

          <div className="summary-item total">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <div className="coupon-section">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            />
            <button className="apply-btn" onClick={applyCoupon}>
              Apply
            </button>
          </div>

          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
