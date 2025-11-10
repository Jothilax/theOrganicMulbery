import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
    upiId: "",
  });
  const [cartSummary, setCartSummary] = useState({
    itemCount: 2,
    subtotal: 121000,
    discount: 0,
    tax: 6050,
    total: 127050,
    appliedCoupon: null,
  });

  useEffect(() => {
    // Cart summary would be fetched from API or context
    // This is a simplified version
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      paymentMethod,
      cartSummary,
      orderDate: new Date().toISOString(),
      orderId: `ORD-${Date.now()}`,
    };

    console.log("Order submitted:", orderData);
    // Clear cart - would be handled by cart service/API
    alert("Order placed successfully! (Demo)");
  };

  if (cartSummary.itemCount === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <p>Add some items before proceeding to checkout.</p>
        <Link to="/collection" className="btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="back-link">
        <Link to="/cart">← Back to Cart</Link>
      </div>

      <h1>Checkout</h1>

      <div className="checkout-grid">
        {/* Form Section */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input name="address" value={formData.address} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>State</label>
              <input name="state" value={formData.state} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>ZIP Code</label>
              <input name="zipCode" value={formData.zipCode} onChange={handleChange} required />
            </div>
          </div>

          <h2>Payment Information</h2>

          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Credit / Debit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              UPI
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              PayPal
            </label>
          </div>

          {paymentMethod === "card" && (
            <>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry (MM/YY)</label>
                  <input name="expiry" value={formData.expiry} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input name="cvv" value={formData.cvv} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Name on Card</label>
                  <input name="cardName" value={formData.cardName} onChange={handleChange} required />
                </div>
              </div>
            </>
          )}

          {paymentMethod === "upi" && (
            <div className="form-group">
              <label>UPI ID</label>
              <input
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                placeholder="yourname@upi"
                required
              />
            </div>
          )}

          <button type="submit" className="btn-primary">
            Place Order - ₹{cartSummary.total.toFixed(2)}
          </button>
        </form>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          {cartSummary.appliedCoupon && (
            <div className="coupon-box">
              <span>🎁 {cartSummary.appliedCoupon.code}</span>
              <p>{cartSummary.appliedCoupon.description}</p>
            </div>
          )}

          <div className="summary-line">
            <span>Subtotal ({cartSummary.itemCount} items)</span>
            <span>₹{cartSummary.subtotal.toLocaleString()}</span>
          </div>

          {cartSummary.discount > 0 && (
            <div className="summary-line green">
              <span>Discount ({cartSummary.appliedCoupon?.code})</span>
              <span>-₹{cartSummary.discount.toLocaleString()}</span>
            </div>
          )}

          <div className="summary-line">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="summary-line">
            <span>Tax</span>
            <span>₹{cartSummary.tax.toFixed(2)}</span>
          </div>

          <hr />

          <div className="summary-total">
            <strong>Total</strong>
            <strong>₹{cartSummary.total.toFixed(2)}</strong>
          </div>

          {cartSummary.discount > 0 && (
            <p className="save-text">🎉 You saved ₹{cartSummary.discount.toLocaleString()}!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
