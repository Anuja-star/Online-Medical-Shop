import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="bg-black/60 backdrop-blur-md fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-white hover:text-red-400 transition duration-300"
        >
          💊 MediShop
        </Link>

        {/* Right Side (Login/Register OR Username/Logout) */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-200 font-semibold">
                Hello, {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-200 hover:text-white font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-200 hover:text-white font-medium transition"
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
