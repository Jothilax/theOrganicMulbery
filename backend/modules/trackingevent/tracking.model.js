import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
import Order from "../order/order.model.js";

const tracking = sequelize.define("Tracking", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'orders', key: 'id' }
    },
    status: {
        type: DataTypes.ENUM(
            'Order Placed',
            'Packed',
            'Shipped',
            'Out for Delivery',
            'Delivered'
        ),
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.UUID,
    },
    updated_by: {
        type: DataTypes.UUID,
    },
}, {
    tableName: "tracking",
    timestamps: true
});

tracking.belongsTo(Order, { foreignKey: "order_id", targetKey: "id", as: "order" });

export default tracking;