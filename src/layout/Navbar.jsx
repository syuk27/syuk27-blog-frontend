import { Link, useNavigate } from "react-router-dom";
import "./Layout.css";
import { useState } from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // React Router 네비게이션

  return (
    // <div className="container mt-5 text-center">
    //   <h2 className="mb-4">Easy Ledger - Sample</h2>
    //   <Button clickFnc={HandleNewPost}>New Post</Button>
    // </div>

    <nav className="navbar navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">
        syuk27-blog
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
      <div className="flex">
        <Link to="/" className="text-dark me-3.5 text-decoration-none">
          <FaSignInAlt className="me-1" /> Sign in
        </Link>
        <Link to="/" className="text-dark text-decoration-none">
          <FaUserPlus className="me-1" /> Sign up
        </Link>
      </div>
    </nav>
  );
}
