import { Link } from "react-router-dom";
import "../App.css";
function Navbar() {
  return (
    <>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            Taskify
          </Link>
        </div>
        <div className="content">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Pricing</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="button">
          <button className="btn">
            <Link to="/signup" className="link">
              Join
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
export default Navbar;
