import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate

export default function AdminRegister() {
  const [admin, setAdmin] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/admin/register", {
        name: admin.name.trim(),
        email: admin.email.trim(),
        password: admin.password.trim(),
      });
      alert("Admin Registered successfully");
      setAdmin({ name: "", email: "", password: "" }); // clear form
      navigate("/admin/login"); // go to login after register
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  // ✅ function to navigate to login page
  const goToLogin = () => {
    navigate("/admin/login");
  };

  return (
    <div style={{ padding: 29 }}>
      <h2>Admin Register</h2>
      <form onSubmit={handleSubmit}>
        <table border="1">
          <tbody>
            <tr>
              <th>
                <label htmlFor="adminName">Name</label>
              </th>
              <td>
                <input
                  id="adminName"
                  type="text"
                  name="name"
                  placeholder="Enter your Name"
                  value={admin.name}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="adminEmail">Email</label>
              </th>
              <td>
                <input
                  id="adminEmail"
                  type="email"
                  name="email"
                  placeholder="admin@gmail.com"
                  value={admin.email}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="adminPassword">Password</label>
              </th>
              <td>
                <input
                  type="password"
                  id="adminPassword"
                  name="password"
                  placeholder="UvWx@@$64..."
                  value={admin.password}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit" style={{ marginTop: 10 }}>
          Register
        </button>
      </form>

      <p style={{ marginTop: 10 }}>
        Already Registered?{" "}
        <button
          style={{
            color: "blue",
            textDecoration: "underline",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          onClick={goToLogin} // ✅ call defined function
        >
          Login here
        </button>
      </p>
    </div>
  );
}
