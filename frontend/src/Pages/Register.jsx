import { useState } from "react";
import API from "../Api/Api";

export default function Register({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !password) {
      alert("Please enter username & password");
      return;
    }

    try {
      await API.post("/auth/register", {
        username,
        password,
      });

      alert("Registered Successfully!");

      // 🔹 Go back to login page
      setPage("login");

    } catch (err) {
      console.log(err);
      alert("Registration Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Register</button>

        {/* 🔹 Back to login */}
        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setPage("login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}