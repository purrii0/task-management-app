import { Link } from "react-router-dom";
import "../App.css";
function Main() {
  return (
    <>
      <div className="main">
        <div className="maincontainer">
          <div className="left">
            <h1>
              Collaborate seamlessly and manage tasks together in real-time
            </h1>
            <h3>
              Work together on tasks, stay on top of deadlines, and boost
              productivity—all in one place.
            </h3>
            <button className="btn">
              <Link to="/signup" className="link">
                Get Started
              </Link>
            </button>
          </div>
          <div className="right">
            <img
              src="https://res.cloudinary.com/imagist/image/fetch/q_auto,f_auto,c_scale,w_1120/https%3A%2F%2Ftodoist.com%2Fstatic%2Fhome-teams%2Fintro%2Fwide%2Fheaderui.en.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Main;
