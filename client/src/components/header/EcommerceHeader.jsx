import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/image.png";
import "./EcommerceHeader.css";

const EcommerceHeader = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(1);
  const [wishlistCount, setWishlistCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: "home", label: "Home", path: "/" },
    { key: "products", label: "Collections", path: "/collection" },
    { key: "about", label: "About", path: "/about" },
    { key: "contact", label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <header className={`ecom-header ${scrolled ? "scrolled" : ""}`}>
        <div className="ecom-header-inner">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <img src={logo} alt="logo" />
          </Link>

          {/* Navigation */}
          <nav className="nav-links">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search + Actions */}
          <div className="header-actions">
            <div className="search-bar">
              <input type="text" placeholder="Search jewellery..." />
              <i className="fa fa-search"></i>
            </div>
            <div className="icon-group">
              <div className="icon-wrapper">
                <i
                  className="fa fa-heart"
                  onClick={() => navigate("/wishlist")}
                ></i>
                {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
              </div>
              <div className="icon-wrapper">
                <i
                  className="fa fa-shopping-cart"
                  onClick={() => navigate("/cart")}
                ></i>
                {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </div>
              <i
                className="fa fa-user"
                onClick={() =>
                  user ? navigate("/profile") : navigate("/login")
                }
              ></i>
              {user && (
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              )}
              <i
                className="fa fa-bars mobile-menu"
                onClick={() => setDrawerVisible(true)}
              ></i>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {drawerVisible && (
        <div className="mobile-drawer">
          <div className="drawer-header">
            <h3>Cartier</h3>
            <button onClick={() => setDrawerVisible(false)}>✕</button>
          </div>
          <div className="drawer-links">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                onClick={() => setDrawerVisible(false)}
                className={location.pathname === item.path ? "active" : ""}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="drawer-footer">
            {user ? (
              <>
                <Link to="/profile" onClick={() => setDrawerVisible(false)}>
                  My Profile
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setDrawerVisible(false)}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setDrawerVisible(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EcommerceHeader;
