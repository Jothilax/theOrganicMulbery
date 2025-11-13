import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OtpVerificationPage.css";

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    // In real app, verify OTP from backend
    navigate("/profile");
  };

  const handleResend = () => {
    setTimer(60);
  };

  return (
    <div className="otp-wrapper">
      <div className="otp-card">
        <div className="otp-header">
          <h2>Verify OTP</h2>
          <p>
            Enter the 6-digit code sent to your{" "}
            {location.state?.method || "phone"}
          </p>
        </div>

        <form className="otp-form" onSubmit={handleVerify}>
          <div className="otp-inputs">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
              />
            ))}
          </div>

          <button type="submit" className="otp-btn">
            Verify
          </button>
        </form>

        <div className="otp-footer">
          {timer > 0 ? (
            <span>Resend OTP in {timer}s</span>
          ) : (
            <button onClick={handleResend} className="resend-btn">
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
