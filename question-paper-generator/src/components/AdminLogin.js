import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({
  setToken = () => {},
  setAdminName = () => {},
}) {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/admin/login", {
        email: login.email.trim(),
        password: login.password.trim(),
      });

      // Save token + name
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("adminName", res.data.name);

      setToken(res.data.token);
      setAdminName(res.data.name || "Admin");

      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const goToRegister = () => navigate("/admin/register");

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Login</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 10 }}>
        <input
          type="email"
          name="email"
          placeholder="admin@example.com"
          value={login.email}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={login.password}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit" style={{ marginTop: 10 }}>
          Login
        </button>
      </form>

      <p>
        New Admin?{" "}
        <button
          style={{
            color: "blue",
            textDecoration: "underline",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          onClick={goToRegister}
        >
          Register here
        </button>
      </p>
    </div>
  );
}
