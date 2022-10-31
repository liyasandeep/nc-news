import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
// import { CgProfile } from "react-icons/cg";
const Navbar = () => {
  const { user } = useContext(UserContext);
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="link black">
            HOME
          </Link>
        </li>
        <li>
          <Link to="/topics" className="link black">
            TOPICS
          </Link>
        </li>
        <li>
          <Link to="/articles" className="link black">
            ARTICLES
          </Link>
        </li>
      </ul>
      <div className="welcome-user">
        {/* <CgProfile /> */}

        <h3>Welcome {user}</h3>
      </div>
    </nav>
  );
};
export default Navbar;
