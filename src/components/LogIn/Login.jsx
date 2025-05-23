import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import PopupFailed from "./PopUpFailed";
// import { useSignIn } from "react-auth-kit";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showFailed, setShowFailed] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userFound = users.find(
      (user) => user.email === email && user.password === password
    );

    if (userFound) {
      localStorage.setItem("currentUser", JSON.stringify(userFound));
      navigate("/daily");
    } else {
      setShowFailed(true);
    }
  };
  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
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
        <form className="login-form" onSubmit={handleLogin}>
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
          <button type="submit">Log in</button>
          <p className="signup-text">
            Don't have an account? <span className="signup-link" onClick={handleSignupRedirect}> Sign up </span>
          </p>
        </form>
      </div>

      <PopupFailed
        show={showFailed}
        onClose={() => setShowFailed(false)}
        title="Failed"
        message="Incorrect email or password"
      />

    </div>
  );  
};

export default Login;
