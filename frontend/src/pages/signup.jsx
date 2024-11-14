import { Link } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import toast from "react-hot-toast";
function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  async function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="parentForum">
      <div className="forum">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up Form</h1>
          <label htmlFor="name">
            Full Name:{" "}
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="username">
            Username:{" "}
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username Should be Unique"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="email">
            Email:{" "}
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Provide Proper Email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            Password:{" "}
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <button className="btn">Sign Up</button>
        </form>
        <div className="extras">
          <p>
            Already Have a Account?{" "}
            <Link to="/signin" className="link">
              {" "}
              Sign In
            </Link>
          </p>
          <p>
            <Link to="/" className="link">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
