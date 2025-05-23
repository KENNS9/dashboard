import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import PopupSuccess from "./PopUpSuccess";
import PopupAccount from "./PopUpAccount";

const signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessed, setShowSuccessed] = useState(false);
  const [showAcc, setShowAcc] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      setShowAcc(true);
      return;
    }

    users.push({ username, email, password });

    localStorage.setItem("users", JSON.stringify(users));
    setShowSuccessed(true);
    
  };

  const handleSigninRedirect = () => {
    navigate("/");
  };
  return (
    <div className="signup-container">
      <div className="left-panel">
        <div className="logo-top">
          <img src="./images/def.png" alt="DEFEND ID Logo" />
        </div>

        <div className="welcome-text">
          <h2>
            WELCOME TO <span className="highlight">NEWS ANALYTICS</span><br />
            <span className="highlight">TECHNOLOGY DASHBOARD</span>
          </h2>
        </div>

        <img className="illustration" src="./images/schematiq.png" alt="Illustration" />
        
        <div className="logo-bottom">
          <img src="./images/bumn.png" alt="BUMN Logo" />
          <img src="./images/akhlak.png" alt="AKHLAK Logo" />
        </div>
      </div>

      <div className="right-panel">
        <form className="signup-form" onSubmit={handleSignup}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          <p className="login-text">
            Don't have an account? <span className="login-link" onClick={handleSigninRedirect}>Log in</span> now
          </p>
        </form>
      </div>

      <PopupSuccess
        show={showSuccessed}
        onClose={() => {
          setShowSuccessed(false);
          navigate("/");
        }}
        title="Success"
        message= "Your account is ready, Log in to get started"
      />
      <PopupAccount
        show={showAcc}
        onClose={() => setShowAcc(false)}
        title="Email Already Exists"
        message="Try logging in instead"
      />

    </div>
  );  
};

export default signup;
