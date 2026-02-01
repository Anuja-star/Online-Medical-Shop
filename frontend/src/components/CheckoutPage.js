import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";

const API_URL = "https://online-medical-shop-production.up.railway.app/api/orders";

function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    payment: "cod",
  });

  const username = localStorage.getItem("username");

  // 🔹 Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // 🔹 Handle form input with validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Name: only alphabets and spaces
    if (name === "name") {
      if (!/^[A-Za-z\s]*$/.test(value)) return;
    }

    // ✅ Contact: only numbers, max 10 digits
    if (name === "contact") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Total price
  const totalAmount = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
    0
  );

  // 🔹 Place order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!username) {
      alert("❌ Please login first");
      return;
    }

    if (cart.length === 0) {
      alert("❌ Cart is empty");
      return;
    }

    // ✅ Final validation before submit
    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      alert("❌ Name should contain only alphabets");
      return;
    }

    if (!/^\d{10}$/.test(formData.contact)) {
      alert("❌ Contact number must be exactly 10 digits");
      return;
    }

    // ✅ Proper medicine names
    const medicineNames = cart
      .map((item) => item.medicine_name || item.name)
      .join(", ");

    // ✅ Items payload
    const itemsPayload = cart.map((item) => ({
      medicineId: Number(item.medicineId ?? item.id),
      quantity: Number(item.quantity || 1),
      price: Number(item.price),
    }));

    // ❌ Prevent null IDs
    if (itemsPayload.some((i) => !i.medicineId)) {
      alert("❌ Invalid medicine in cart. Please clear cart and try again.");
      return;
    }

    const orderPayload = {
      username: username.trim(),
      customerName: formData.name.trim(),
      address: formData.address.trim(),
      contact: formData.contact.trim(),
      paymentMethod: formData.payment,
      medicineName: medicineNames,
      items: itemsPayload,
      totalPrice: totalAmount,
    };

    console.log("Order Payload:", orderPayload);

    try {
      setLoading(true);

      await axios.post(API_URL, orderPayload, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.removeItem("cart");
      setCart([]);
      alert("✅ Order placed successfully!");
      navigate("/success");

    } catch (error) {
      console.error("Order Error:", error.response || error);
      alert(error.response?.data?.message || "❌ Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 UPI QR
  const upiQR = `upi://pay?pa=chavananuja1238@okicici&pn=MediShop&am=${totalAmount}&cu=INR`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 via-blue-200 to-purple-200 p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        Checkout & Delivery
      </h2>

      <div className="max-w-md mx-auto space-y-6">

        {/* Delivery Form */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold mb-4">Delivery Details</h3>

          <form onSubmit={handlePlaceOrder} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              pattern="[A-Za-z\s]+"
              title="Name should contain only alphabets"
              className="w-full border px-3 py-2 rounded"
            />

            <textarea
              name="address"
              placeholder="Address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="tel"
              name="contact"
              placeholder="Contact Number"
              required
              value={formData.contact}
              onChange={handleChange}
              maxLength={10}
              pattern="[0-9]{10}"
              title="Contact number must be exactly 10 digits"
              className="w-full border px-3 py-2 rounded"
            />

            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="upi">UPI / Online</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>

          </form>
        </div>

        {/* UPI QR */}
        {formData.payment === "upi" && cart.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-lg font-bold mb-3 text-green-700">
              Scan & Pay ₹{totalAmount.toFixed(2)}
            </h3>
            <div className="flex justify-center bg-gray-100 p-4 rounded">
              <QRCode value={upiQR} size={180} />
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>

          {cart.map((item, i) => (
            <div key={i} className="border-b py-2">
              <p className="font-semibold">
                {item.medicine_name || item.name}
              </p>
              <p className="text-sm text-gray-500">
                ₹{item.price} × {item.quantity || 1}
              </p>
            </div>
          ))}

          <p className="font-bold mt-3 text-green-600">
            Total: ₹{totalAmount.toFixed(2)}
          </p>
        </div>

      </div>
    </div>
  );
}

export default CheckoutPage;
