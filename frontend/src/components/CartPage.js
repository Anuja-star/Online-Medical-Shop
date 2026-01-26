import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // ================= REMOVE ITEM =================
  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ================= CHECKOUT =================
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/checkout");
  };

  // ================= TOTAL =================
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-indigo-200 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          🛒 Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ₹{item.price} × {item.quantity || 1}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-indigo-700">
                      ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                    </span>

                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span className="text-green-600">
                ₹{total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
