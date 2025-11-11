// import React, { useEffect, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./RegisterPage.css";

// const RegisterPage = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState("mobile");
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const inputsRef = useRef([]);
//   const [timer, setTimer] = useState(60);
//   const [termsOpen, setTermsOpen] = useState(false);
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   useEffect(() => {
//     if (step === "otp") {
//       inputsRef.current[0]?.focus();
//       setTimer(60);
//     }
//   }, [step]);

//   useEffect(() => {
//     if (step !== "otp" || timer <= 0) return;
//     const id = setTimeout(() => setTimer((t) => t - 1), 1000);
//     return () => clearTimeout(id);
//   }, [timer, step]);

//   const handleSendOtp = (e) => {
//     e.preventDefault();
//     if (!/^\d{10}$/.test(mobile)) {
//       alert("Enter valid 10-digit mobile number");
//       return;
//     }
//     setStep("otp");
//   };

//   const handleOtpChange = (index, value) => {
//     if (!/^\d?$/.test(value)) return;
//     const next = [...otp];
//     next[index] = value;
//     setOtp(next);
//     if (value && index < 5) inputsRef.current[index + 1]?.focus();
//   };

//   const handleOtpKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0)
//       inputsRef.current[index - 1]?.focus();
//   };

//   const handleVerifyOtp = (e) => {
//     e.preventDefault();
//     if (otp.join("").length === 6) setStep("details");
//   };

//   const handleResend = () => setTimer(60);

//   const handleDetailsSubmit = (e) => {
//     e.preventDefault();
//     if (!termsAccepted) {
//       alert("Please accept the terms and conditions");
//       return;
//     }
//     if (
//       !formData.firstName ||
//       !formData.lastName ||
//       !formData.email ||
//       !formData.password ||
//       formData.password !== formData.confirmPassword
//     ) {
//       alert("Please fill all fields correctly");
//       return;
//     }

//     const userData = {
//       id: Date.now(),
//       name: `${formData.firstName} ${formData.lastName}`,
//       email: formData.email,
//       mobile: mobile,
//       role: "customer",
//       registrationTime: new Date().toISOString(),
//       isAuthenticated: true,
//     };

//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("userToken", "mock-jwt-token-" + Date.now());

//     alert("Account created successfully!");
//     navigate("/");
//   };

//   return (
//     <div className="register-container">
//       <div className="register-card">
//         <div className="register-header">
//           <h2>Create Account</h2>
//           <p>
//             Already have an account?{" "}
//             <Link to="/login" className="link">
//               Sign in
//             </Link>
//           </p>
//         </div>

//         {/* Step 1: Mobile */}
//         {step === "mobile" && (
//           <form onSubmit={handleSendOtp} className="form-section">
//             <label>Mobile Number</label>
//             <input
//               type="tel"
//               maxLength={10}
//               value={mobile}
//               onChange={(e) =>
//                 setMobile(e.target.value.replace(/[^0-9]/g, ""))
//               }
//               placeholder="Enter 10-digit mobile number"
//               required
//             />
//             <button type="submit" className="btn">
//               Send OTP
//             </button>
//           </form>
//         )}

//         {/* Step 2: OTP */}
//         {step === "otp" && (
//           <form onSubmit={handleVerifyOtp} className="form-section">
//             <p className="otp-info">
//               Enter the 6-digit code sent to {mobile}
//             </p>
//             <div className="otp-box">
//               {otp.map((digit, i) => (
//                 <input
//                   key={i}
//                   ref={(el) => (inputsRef.current[i] = el)}
//                   type="text"
//                   maxLength={1}
//                   className="otp-input"
//                   value={digit}
//                   onChange={(e) => handleOtpChange(i, e.target.value)}
//                   onKeyDown={(e) => handleOtpKeyDown(i, e)}
//                 />
//               ))}
//             </div>
//             <button type="submit" className="btn">
//               Verify OTP
//             </button>
//             <div className="resend">
//               {timer > 0 ? (
//                 <span>Resend OTP in {timer}s</span>
//               ) : (
//                 <button type="button" onClick={handleResend} className="link">
//                   Resend OTP
//                 </button>
//               )}
//             </div>
//           </form>
//         )}

//         {/* Step 3: Details */}
//         {step === "details" && (
//           <form onSubmit={handleDetailsSubmit} className="form-section">
//             <div className="row">
//               <div>
//                 <label>First Name</label>
//                 <input
//                   type="text"
//                   value={formData.firstName}
//                   onChange={(e) =>
//                     setFormData({ ...formData, firstName: e.target.value })
//                   }
//                   placeholder="First name"
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Last Name</label>
//                 <input
//                   type="text"
//                   value={formData.lastName}
//                   onChange={(e) =>
//                     setFormData({ ...formData, lastName: e.target.value })
//                   }
//                   placeholder="Last name"
//                   required
//                 />
//               </div>
//             </div>

//             <label>Email</label>
//             <input
//               type="email"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               placeholder="Enter your email"
//               required
//             />

//             <label>Password</label>
//             <input
//               type="password"
//               value={formData.password}
//               onChange={(e) =>
//                 setFormData({ ...formData, password: e.target.value })
//               }
//               placeholder="Create a password"
//               required
//             />

//             <label>Confirm Password</label>
//             <input
//               type="password"
//               value={formData.confirmPassword}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   confirmPassword: e.target.value,
//                 })
//               }
//               placeholder="Confirm password"
//               required
//             />

//             <div className="terms">
//               <input
//                 type="checkbox"
//                 checked={termsAccepted}
//                 onChange={(e) => setTermsAccepted(e.target.checked)}
//               />
//               <span>
//                 I agree to the{" "}
//                 <button
//                   type="button"
//                   className="link"
//                   onClick={() => setTermsOpen(true)}
//                 >
//                   Terms and Conditions
//                 </button>
//               </span>
//             </div>

//             <button type="submit" disabled={!termsAccepted} className="btn">
//               Create Account
//             </button>
//           </form>
//         )}
//       </div>

//       {/* Terms Modal */}
//       {termsOpen && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <h3>Terms and Conditions</h3>
//             <div className="modal-content">
//               <p>
//                 By creating an account, you agree to our data usage and privacy
//                 policy.
//               </p>
//               <p>
//                 Your phone number will only be used for account verification and
//                 updates.
//               </p>
//               <p>All purchases are subject to our return and refund policy.</p>
//               <p>If you have questions, contact support.</p>
//             </div>
//             <button className="btn" onClick={() => setTermsOpen(false)}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RegisterPage;


import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // 🖱 Track Mouse Movement for avatar animation
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

  // 🧠 Handle Login Submit → go to OTP page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contact) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/otp-verification", { state: { contact } });
    }, 1000);
  };

  return (
    <div ref={containerRef} className="login-container">
      <div className="login-card">
        {/* Avatar */}
        <div className="avatar-wrapper">
          <div className="avatar">
            <div className="eye left-eye">
              <div
                className="pupil"
                style={{
                  transform: `translate(${(mousePosition.x - 50) * 0.08}px, ${
                    (mousePosition.y - 50) * 0.08
                  }px)`,
                }}
              ></div>
            </div>
            <div className="eye right-eye">
              <div
                className="pupil"
                style={{
                  transform: `translate(${(mousePosition.x - 50) * 0.08}px, ${
                    (mousePosition.y - 50) * 0.08
                  }px)`,
                }}
              ></div>
            </div>
            <div className="mouth"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in with Email or Phone Number</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email / Phone Number</label>
            <input
              type="text"
              placeholder="Enter your email or phone number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Processing..." : "Send OTP"}
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
