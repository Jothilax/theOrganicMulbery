// src/components/EcommerceFooter.jsx
import { Link } from "react-router-dom";
import "./EcommerceFooter.css";

const EcommerceFooter = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Newsletter */}
        <div className="newsletter">
          <div className="newsletter-content">
            <div>
              <h3>Join our Insider List</h3>
              <p>Get new launches and offers. 10% off your first order.</p>
            </div>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </form>
          </div>
        </div>

        {/* Main sections */}
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-title">Stellar Jewels</h3>
            <p className="footer-text">
              Timeless gold and diamond jewellery crafted with precision and
              care.
            </p>
            <div className="footer-socials">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
              <a href="#">YouTube</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/collection">Shop</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h3 className="footer-title">Categories</h3>
            <ul>
              <li>
                <a href="#">Gold Jewellery</a>
              </li>
              <li>
                <a href="#">Diamond Jewellery</a>
              </li>
              <li>
                <a href="#">Silver Jewellery</a>
              </li>
              <li>
                <a href="#">Platinum Jewellery</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <div className="footer-contact">
              <p>+91-9876543210</p>
              <p>hello@stellarjewels.com</p>
              <p>123 Jewellery Street, Mumbai, India</p>
              <p>Mon-Sun: 10:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2025 Stellar Jewels. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EcommerceFooter;
