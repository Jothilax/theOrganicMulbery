import React, { useState, useEffect } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("coupons");
  const [user, setUser] = useState(null);
  const [coupons, setCoupons] = useState({
    available: [],
    used: [],
    expired: []
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      window.location.href = "/login";
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
  }, []);

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
          {user ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <div className="profile-info">
          <h2>{user ? user.name : "User Name"}</h2>
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
            <p>
              <strong>Name:</strong> {user ? user.name : "User"}
            </p>
            <p>
              <strong>Email:</strong> {user ? user.email : "user@email.com"}
            </p>
            <p>
              <strong>Joined:</strong>{" "}
              {user
                ? formatDate(user.registrationTime || new Date())
                : "Jan 2024"}
            </p>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="info-box">
            <h3>Order History</h3>
            <p>No orders yet.</p>
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
                localStorage.removeItem("user");
                window.location.href = "/login";
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
