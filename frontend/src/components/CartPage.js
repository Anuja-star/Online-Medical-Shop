import React from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate();

  // Load cart from local storage
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const handleCheckout = () => {
    // Save the cart again before going to checkout
    localStorage.setItem("cart", JSON.stringify(cartItems));

    navigate("/checkout");
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">🛍️ Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-3 rounded-lg shadow"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ₹{item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <span className="font-bold text-indigo-700">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total:</span>
            <span className="text-green-600">₹{total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
