import { useState } from "react";
import api from "./api";
import sweetImage from "./assets/sweet-login.png";

function Login({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: "420px", margin: "80px auto" }}>
      {/* 🌟 Brand Header */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "4px" }}>🍬 Sweet Shop Manager</h2>
        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          Fresh sweets, smarter sales
        </p>
      </div>

      {/* 🖼️ Illustration */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src={sweetImage}
          alt="Sweet Shop"
          style={{ width: "180px", maxWidth: "100%" }}
        />
      </div>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword((p) => !p)}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Don’t have an account?{" "}
        <span
          style={{ color: "#4f46e5", cursor: "pointer", fontWeight: 500 }}
          onClick={onSwitch}
        >
          Register
        </span>
      </p>
    </div>
  );
}

export default Login;
