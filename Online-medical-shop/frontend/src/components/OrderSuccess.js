import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");   // clear login data
    sessionStorage.clear();            // optional
    navigate("/login");                // redirect to login page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-green-700 mb-3">
          🎉 Order Placed Successfully!
        </h2>

        <p className="text-gray-600 mb-6">
          Thank you for shopping with <b>Online Medical Shop</b>.
          <br /> Your medicines will be delivered soon.
        </p>

        {/* Back to Shop Button */}
        <button
          onClick={() => navigate("/shop")}
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 mb-3"
        >
          Back to Shop
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
