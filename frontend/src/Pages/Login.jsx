import { useState } from "react";
import API from "../Api/Api";
import "./Login.css";

export default function Login({ setToken, setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log("Sending:", username, password);

      const res = await API.post("/auth/login", {
        username,
        password,
      });

      console.log("Response:", res.data);

      const token = res.data?.trim();

      if (!token || token === "Invalid credentials") {
        alert("Invalid Credentials");
        return;
      }

      localStorage.setItem("token", token);
      setToken(token);

    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

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

        <button onClick={handleLogin}>Login</button>

        {/* 🔹 ADD THIS */}
        <p style={{ marginTop: "10px" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setPage("register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}