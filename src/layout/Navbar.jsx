import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Layout.css";
import { useEffect } from "react";

export default function Navbar({user}) {
  console.log("nav", user);

  useEffect(() => {

  }, [user])

  return (

    <nav className="navbar navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">
        syuk27Blog
      </Link>
      <div>
        <Link
          to="/blog_posts"
          className="text-dark me-3.5 text-decoration-none"
        >
          posts
        </Link>
        <Link
          to="/admin_editor"
          className="text-dark me-3.5 text-decoration-none"
        >
          admin_editor
        </Link>
      </div>
      <div className="[display:ruby]">
        {user === null && (
          <>
          <Link to="/sign_in" className="text-dark me-3.5 text-decoration-none">
            <FaSignInAlt className="me-1" /> Sign in
          </Link>
          <Link to="/sign_up" className="text-dark text-decoration-none">
            <FaUserPlus className="me-1" /> Sign up
          </Link>
          </>
        )}
        {user !== null && (
          <>
          <Link to="/" className="text-dark me-3.5 text-decoration-none">
            login : {user.nickname} {user.role}
          </Link>
          <Link to="/sign_out" className="text-dark text-decoration-none">
            <FaSignInAlt className="me-1" /> Sign out
          </Link>
          </>
        )}
      </div>
    </nav>
  );
}
