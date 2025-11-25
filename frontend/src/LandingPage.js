import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

function LandingPage() {
  return (
    <div
      className="relative h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/hero-bg.jpg')", // your uploaded image
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to <span className="text-red-400">💊 MediShop</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 font-light">
          Your trusted online medicine store — order easily from home.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/shop"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300"
          >
            🛍️ Start Shopping
          </Link>
          <Link
            to="/login"
            className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300"
          >
            🔐 Login
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-sm text-gray-300">
        © {new Date().getFullYear()} MediShop — All rights reserved.
      </div>
    </div>
  );
}

export default LandingPage;
