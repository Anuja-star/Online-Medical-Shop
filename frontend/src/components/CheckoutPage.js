
import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:9091/api/orders";

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

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation: Names (Alphabets only)
    if (name === "name" && !/^[A-Za-z\s]*$/.test(value)) return;

    // Validation: Contact (Numbers only, max 10)
    if (name === "contact") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
    0
  );

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Basic Guard Clauses
    if (!username) {
      alert("❌ Please login first to place an order.");
      return;
    }

    if (cart.length === 0) {
      alert("❌ Your cart is empty.");
      return;
    }

    if (formData.contact.length !== 10) {
      alert("❌ Contact number must be exactly 10 digits.");
      return;
    }

    const medicineNames = cart
      .map((item) => item.medicine_name || item.name)
      .join(", ");

    const itemsPayload = cart.map((item) => ({
      medicineId: Number(item.medicineId ?? item.id),
      quantity: Number(item.quantity || 1),
      price: Number(item.price),
    }));

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

    try {
      setLoading(true);

      // Sending data to backend
      await axios.post(API_URL, orderPayload, {
        headers: { "Content-Type": "application/json" },
      });

      // Clear Cart
      localStorage.removeItem("cart");
      setCart([]);

      // Success Notification based on payment type
     
    const successMsg = formData.payment === "upi" 
  ? "✅ Order details submitted! Please ensure you have completed the UPI payment. We will verify and process your order." 
  : "✅ Order placed successfully! Pay on delivery.";
      
      alert(successMsg);
      
      // Redirect to success page
      navigate("/success");

    } catch (error) {
      console.error("Order Error:", error.response || error);
      alert(error.response?.data?.message || "❌ Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const upiQR = `upi://pay?pa=chavananuja1238@okicici&pn=MediShop&am=${totalAmount}&cu=INR`;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT SIDE: FORM & PAYMENT */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
              Delivery Information
            </h2>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                <textarea
                  name="address"
                  placeholder="Street, City, Pincode"
                  required
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="tel"
                  name="contact"
                  placeholder="10-digit number"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  name="payment"
                  value={formData.payment}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                >
                  <option value="cod">Cash on Delivery (COD)</option>
                  <option value="upi">UPI / Online Payment</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className={`w-full py-3 mt-4 text-white font-bold rounded-lg transition-all ${
                  loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
                }`}
              >
                {loading ? "Processing..." : `Place Order (₹${totalAmount.toFixed(2)})`}
              </button>
            </form>
          </div>

          {/* UPI QR Code Section */}
          {formData.payment === "upi" && cart.length > 0 && (
            <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-dashed border-indigo-300 text-center animate-fade-in">
              <h3 className="text-md font-bold mb-3 text-indigo-800">Scan to Pay with UPI</h3>
              <div className="inline-block bg-white p-3 rounded-xl shadow-sm mb-3">
                <QRCode value={upiQR} size={150} />
              </div>
              <p className="text-xs text-indigo-600 font-medium">
                Pay ₹{totalAmount.toFixed(2)} and then click 'Place Order' above.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT SIDE: ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Order Summary</h2>
          <div className="max-h-80 overflow-y-auto pr-2">
            {cart.length > 0 ? (
              cart.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-gray-50">
                  <div>
                    <p className="font-semibold text-gray-700">{item.medicine_name || item.name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity || 1}</p>
                  </div>
                  <p className="font-medium text-gray-800">₹{(item.price * (item.quantity || 1)).toFixed(2)}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic text-center py-4">Your cart is empty</p>
            )}
          </div>
          
          <div className="mt-6 pt-4 border-t-2 border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Grand Total</span>
              <span className="text-2xl font-black text-green-600">₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CheckoutPage;
