import React, { useState } from "react";
import styles from "./login.module.css";
import { loginUser } from "../../services/authService.js";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image.png";

export default function Login({ onLoginSuccess }) { // ✅ receive callback
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });

      if (response.data.success) {
        setMessage(response.data.message || "Login successful!");
        localStorage.setItem("token", response.data.token);

        // ✅ tell App that login succeeded
        if (onLoginSuccess) onLoginSuccess();

        // ✅ navigate to default page
        navigate("/category");
      } else {
        setMessage("Invalid credentials!");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid credentials!");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>

        <h2 className={styles.loginTitle}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
        <a href="#">Forgot password?</a>
      </div>
    </div>
  );
}
