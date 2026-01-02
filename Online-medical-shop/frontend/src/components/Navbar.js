import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // Safe user parsing
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="bg-black/70 backdrop-blur-md fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-white hover:text-red-400 transition"
        >
          💊 MediShop
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-200 font-medium hidden sm:block">
                Hi, {user.username}
              </span>

              {user.role === "ADMIN" && (
                <Link
                  to="/admin"
                  className="text-indigo-200 hover:text-indigo-300 font-medium"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>

          <Link to="/" className="text-gray-200 hover:text-white transition">
            Home
          </Link>
          <Link to="/shop" className="text-gray-200 hover:text-white transition">
            Medicines
          </Link>
          <Link to="/about" className="text-gray-200 hover:text-white transition">
            About
          </Link>
          <Link to="/contact" className="text-gray-200 hover:text-white transition">
            Contact
          </Link>
    
              <Link
                to="/login"
                className="text-gray-200 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-200 hover:text-white transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

