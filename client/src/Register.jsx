import { useState } from "react";
import api from "./api";
import sweetImage from "./assets/sweet-login.png";

function Register({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      setSuccess("Registration successful. Redirecting to login...");
      setTimeout(onSwitch, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: "420px", margin: "80px auto" }}>
      {/* Brand Header */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "4px" }}>🍬 Sweet Shop Manager</h2>
        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          Fresh sweets, smarter sales
        </p>
      </div>

      {/*  Illustration */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src={sweetImage}
          alt="Sweet Shop"
          style={{ width: "180px", maxWidth: "100%" }}
        />
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleRegister}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="user@example.com"
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

        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Already have an account?{" "}
        <span
          style={{ color: "#4f46e5", cursor: "pointer", fontWeight: 500 }}
          onClick={onSwitch}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Register;
