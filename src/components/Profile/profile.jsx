import React, { useEffect, useState } from "react";
import "./Profile.css";
import avatarList from "../../assets/avatarList";

const Profile = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const storedAvatar = localStorage.getItem("selectedAvatar");

    if (storedUser) {
      setUsername(storedUser.username);
      setEmail(storedUser.email);
      setAvatar(storedAvatar || "");
    }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      username,
      email,
      password: "********",
    };

    // Simpan currentUser dan selectedAvatar
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem("selectedAvatar", avatar);

    // Update users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.email === email ? { ...user, username } : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    window.dispatchEvent(new Event("avatarChanged"));

    onClose();
  };

  return (
    <div className="profile-overlay">
      <div className="profile">
        <button className="close-button" onClick={onClose}>×</button>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} readOnly />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value="********" readOnly />
          </div>
          <div className="avatar-section">
            <label>Avatar</label>
            <div className="avatar-list">
              {avatarList.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Avatar ${index + 1}`}
                  onClick={() => setAvatar(src)}
                  className={avatar === src ? "selected-avatar" : ""}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    margin: "5px",
                    cursor: "pointer",
                    border: avatar === src ? "2px solid #007BFF" : "1px solid #ccc"
                  }}
                />
              ))}
            </div>
          </div>
          <button className="save-btn" type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;