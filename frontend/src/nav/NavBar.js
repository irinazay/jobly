import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./NavBar.css";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  return (
    <nav className="Navigation navbar navbar-expand-md">
      <Link className="navbar-brand" to="/">
        Jobly
      </Link>
      {currentUser ? (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/companies">
              Companies
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/jobs">
              Jobs
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/applications">
              Applications
            </NavLink>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={logout}>
              Log out {currentUser.first_name}
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
