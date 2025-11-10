import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // 🖱 Track Mouse Movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({
          x: Math.min(Math.max(x, 10), 90),
          y: Math.min(Math.max(y, 10), 90),
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 🧠 Handle Login Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "John Doe",
          email: "test@example.com",
          isAuthenticated: true,
        })
      );
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div ref={containerRef} className="login-container">
      <div className="login-card">
        {/* Avatar with Animated Eyes */}
        <div className="avatar-wrapper">
          <div className="avatar">
            <div className="eye left-eye">
              <div
                className={`pupil ${isTypingPassword ? "closed" : ""}`}
                style={{
                  transform: isTypingPassword
                    ? "scaleY(0)"
                    : `translate(${(mousePosition.x - 50) * 0.08}px, ${
                        (mousePosition.y - 50) * 0.08
                      }px)`,
                }}
              ></div>
            </div>
            <div className="eye right-eye">
              <div
                className={`pupil ${isTypingPassword ? "closed" : ""}`}
                style={{
                  transform: isTypingPassword
                    ? "scaleY(0)"
                    : `translate(${(mousePosition.x - 50) * 0.08}px, ${
                        (mousePosition.y - 50) * 0.08
                      }px)`,
                }}
              ></div>
            </div>
            <div
              className={`mouth ${isTypingPassword ? "mouth-typing" : ""}`}
            ></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to continue</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              onFocus={() => setIsTypingPassword(true)}
              onBlur={() => setIsTypingPassword(false)}
            />
          </div>

          <div className="form-footer">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <Link to="/forgetpassword" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <Link to="/register" className="signup-link">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
