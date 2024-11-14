import { Link } from "react-router-dom";
import "../App.css";
function SignIn() {
  return (
    <div className="parentForum">
      <div className="forum">
        <form>
          <h1>Sign In Form</h1>
          <label htmlFor="fullname">
            Email:{" "}
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Provide Proper Email"
            />
          </label>
          <label htmlFor="fullname">
            Password:{" "}
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your Password"
            />
          </label>
          <button className="btn">Sign Up</button>
        </form>
        <div className="extras">
          <p>
            Don't Have a Account?{" "}
            <Link to="/signup" className="link">
              {" "}
              Sign Up
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
export default SignIn;
