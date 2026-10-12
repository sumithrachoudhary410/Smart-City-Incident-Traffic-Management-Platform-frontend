import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "admin", password: "admin123" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await API.post("/auth/login", form);
      login(response.data.accessToken, response.data.username, response.data.role);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your username and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Smart City Platform</h2>
        <p>Sign in to the operational command center</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input className="form-control" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <small className="demo-note">Demo accounts are created on backend startup. For example: admin / admin123</small>
      </div>
    </div>
  );
}
