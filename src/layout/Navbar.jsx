import { Link, useNavigate } from "react-router-dom";
import "./Layout.css";
import { useState } from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // React Router 네비게이션

  return (
    // <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //   <div className="container-fluid">
    //     {/* Navbar Brand */}
    //     <Link className="navbar-brand" to="/">
    //       Easy Ledger
    //     </Link>

    //     {/* Mobile Toggle Button */}
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       onClick={() => setIsOpen(!isOpen)}
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>

    //     {/* Navbar Links */}
    //     <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
    //       <ul className="navbar-nav ms-auto">
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/signin">
    //             <span className="glyphicon glyphicon-log-in"></span> Sign in
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/signup">
    //             <span className="glyphicon glyphicon-user"></span> Sign up
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
    <nav className="navbar navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">
        syuk27-blog
      </Link>
      <div>
        <Link to="/" className="text-dark me-3 text-decoration-none">
          <FaSignInAlt className="me-1" /> Sign in
        </Link>
        <Link to="/" className="text-dark text-decoration-none">
          <FaUserPlus className="me-1" /> Sign up
        </Link>
      </div>
    </nav>
  );
}
