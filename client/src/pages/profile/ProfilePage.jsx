import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { authService } from "../../services/authService";
import { orderService } from "../../services/orderService";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coupons, setCoupons] = useState({
    available: [],
    used: [],
    expired: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('customerToken');
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        
        // Fetch user profile
        const profileResponse = await authService.getProfile();
        if (profileResponse.customer) {
          setUser(profileResponse.customer);
        }

        // Fetch orders
        const ordersResponse = await orderService.getMyOrders();
        if (Array.isArray(ordersResponse)) {
          setOrders(ordersResponse);
        }

        // fake coupons data
        setCoupons({
          available: [
            {
              code: "SAVE10",
              description: "10% Off Your Next Order",
              discount: 10,
              expiry: "2025-12-31",
              status: "available"
            }
          ],
          used: [],
          expired: []
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {user ? (user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()) : "U"}
        </div>
        <div className="profile-info">
          <h2>{user ? (user.name || "User") : "User Name"}</h2>
          <p>{user ? user.email : "user@email.com"}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "coupons" ? "active" : ""}
          onClick={() => setActiveTab("coupons")}
        >
          My Coupons
        </button>
        <button
          className={activeTab === "personal" ? "active" : ""}
          onClick={() => setActiveTab("personal")}
        >
          Personal Info
        </button>
        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
        <button
          className={activeTab === "settings" ? "active" : ""}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      {/* Tabs Content */}
      <div className="tab-content">
        {activeTab === "coupons" && (
          <div>
            <h3>Available Coupons</h3>
            {coupons.available.length === 0 ? (
              <p>No coupons available.</p>
            ) : (
              coupons.available.map((c, i) => (
                <div className="coupon-card" key={i}>
                  <div className="coupon-left">
                    <h4>{c.code}</h4>
                    <p>{c.description}</p>
                    <small>Expires: {formatDate(c.expiry)}</small>
                  </div>
                  <div className="coupon-right">
                    <button>Copy Code</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "personal" && (
          <div className="info-box">
            <h3>Personal Information</h3>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <p>
                  <strong>Name:</strong> {user ? user.name || "Not set" : "User"}
                </p>
                <p>
                  <strong>Email:</strong> {user ? user.email : "user@email.com"}
                </p>
                <p>
                  <strong>Phone:</strong> {user ? user.phone || "Not set" : "Not set"}
                </p>
                {user?.address && (
                  <p>
                    <strong>Address:</strong> {user.address}
                  </p>
                )}
                {user?.city && (
                  <p>
                    <strong>City:</strong> {user.city}
                  </p>
                )}
                {user?.state && (
                  <p>
                    <strong>State:</strong> {user.state}
                  </p>
                )}
                {user?.pincode && (
                  <p>
                    <strong>Pincode:</strong> {user.pincode}
                  </p>
                )}
                <p>
                  <strong>Joined:</strong>{" "}
                  {user && user.createdAt
                    ? formatDate(user.createdAt)
                    : user
                    ? formatDate(new Date())
                    : "Jan 2024"}
                </p>
              </>
            )}
          </div>
        )}

        {activeTab === "orders" && (
          <div className="info-box">
            <h3>Order History</h3>
            {loading ? (
              <p>Loading orders...</p>
            ) : orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-card" style={{ 
                    border: '1px solid #ddd', 
                    padding: '15px', 
                    marginBottom: '15px',
                    borderRadius: '5px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div>
                        <h4>Order #{order.id}</h4>
                        <p style={{ color: '#666', fontSize: '0.9em' }}>
                          Date: {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
                          ₹{order.total_amount?.toLocaleString() || '0'}
                        </p>
                        <p style={{ 
                          color: order.status === 'completed' ? 'green' : 
                                 order.status === 'pending' ? 'orange' : 'gray',
                          fontSize: '0.9em'
                        }}>
                          {order.status || 'Pending'}
                        </p>
                      </div>
                    </div>
                    {order.items && order.items.length > 0 && (
                      <div style={{ marginTop: '10px' }}>
                        <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Items:</p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                          {order.items.map((item, index) => (
                            <li key={index} style={{ 
                              padding: '5px 0',
                              borderBottom: index < order.items.length - 1 ? '1px solid #eee' : 'none'
                            }}>
                              {item.product?.name || 'Unknown Product'} - 
                              Qty: {item.quantity} - 
                              ₹{item.price?.toLocaleString() || '0'} each
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {order.address && (
                      <p style={{ marginTop: '10px', color: '#666', fontSize: '0.9em' }}>
                        Address: {order.address}
                      </p>
                    )}
                    <p style={{ marginTop: '10px', color: '#666', fontSize: '0.9em' }}>
                      Payment: {order.payment_method || 'COD'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="info-box">
            <h3>Account Settings</h3>
            <button>Edit Profile</button>
            <button>Change Password</button>
            <button
              className="logout"
              onClick={() => {
                authService.logout();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
