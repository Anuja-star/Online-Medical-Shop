import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:9091/api/orders";

function CheckoutPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    payment: "cod",
  });

  const [cart, setCart] = useState([]);

  const username = localStorage.getItem("username"); // Logged-in user

  // Load cart on page load
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -------------------------
  // PLACE ORDER (SEND TO BACKEND)
  // -------------------------
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!username) {
      alert("❌ Login required before placing order!");
      return;
    }

    try {
      for (const item of cart) {
        await axios.post(API_URL, {
          username: username,
          customerName: formData.name,
          address: formData.address,
          contact: formData.contact,
          paymentMethod: formData.payment,
          medicineName: item.name,
          quantity: item.quantity,
          totalPrice: item.quantity * item.price,
        });
      }
      
      // Clear cart after order
      localStorage.removeItem("cart");

      navigate("/success");
      
    } catch (error) {
      console.error("Order failed:", error);
      alert("❌ Failed to place order");
    }
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">
        Checkout & Delivery
      </h2>

      {/* USER CART SUMMARY */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        {cart.map((item, i) => (
          <div key={i} className="border-b py-2">
            <p>{item.name}</p>
            <p className="text-sm text-gray-500">
              ₹{item.price} × {item.quantity}
            </p>
          </div>
        ))}

        <p className="font-bold mt-3">Total: ₹{totalAmount}</p>
      </div>

      {/* CHECKOUT FORM */}
      <form onSubmit={handlePlaceOrder} className="space-y-4 bg-white p-6 rounded-xl shadow">

        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Address</label>
          <textarea
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Contact Number</label>
          <input
            type="tel"
            name="contact"
            required
            value={formData.contact}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Payment Method</label>
          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="cod">Cash on Delivery (COD)</option>
            <option value="upi">UPI / Online Payment</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;
