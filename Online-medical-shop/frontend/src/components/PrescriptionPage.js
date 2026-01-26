import React, { useState } from "react";
import doctorImg from "../assets/doctor3.jpg";
import axios from "axios";

function PrescriptionPage() {
  // Form state
  const [file, setFile] = useState(null);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) setPreview(URL.createObjectURL(selectedFile));
  };

  // Handle form submit
  const handleSubmit = async () => {
    if (!file || !address || !phone) {
      alert("Please fill all details");
      return;
    }

    const formData = new FormData();
    formData.append("prescription", file);
    formData.append("address", address);
    formData.append("phone", phone);

    try {
      setLoading(true);
      await axios.post("http://localhost:9091/api/prescriptions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Prescription uploaded successfully. We will contact you.");

      // Reset form
      setFile(null);
      setAddress("");
      setPhone("");
      setPreview(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔥 HERO SECTION */}
      <section className="bg-gradient-to-r from-slate-900 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-15 grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl font-bold mb-4">Order via Prescription</h1>
            <p className="text-lg text-yellow-400 mb-6">
              Upload prescription and we will do the rest for you!
            </p>
            <p className="text-xl font-semibold mb-8">
              ⭐ 1 Lakh+ users prefer this method
            </p>

            <div className="flex flex-wrap gap-6 bg-white/10 p-6 rounded-xl max-w-lg">
              <div className="flex items-center gap-2">👨‍⚕️ <span>Licensed Pharmacists</span></div>
              <div className="flex items-center gap-2">✔ <span>Genuine Medicines</span></div>
              <div className="flex items-center gap-2">📞 <span>Secure Calls</span></div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden lg:block">
            <img
              src={doctorImg}
              alt="Doctor"
              className="w-full max-w-md object-contain"
            />
          </div>

        </div>
      </section>

  {/* 🔥 PRESCRIPTION UPLOAD SECTION */}
  <div className="min-h-screen bg-[#f5f8ff] flex items-center justify-center px-6 py-16">
    <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16">

      {/* LEFT CARD – Upload Prescription */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Order with Prescription
        </h2>
        <p className="text-gray-600 mb-6">
          Upload your prescription and we will deliver medicines to your home
        </p>

        {/* Upload Box */}
        <label className="block cursor-pointer mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="border-2 border-dashed border-emerald-400 rounded-xl p-6 text-center hover:bg-emerald-50 transition">
            <p className="text-emerald-600 font-semibold">
              Click to upload prescription
            </p>
            <p className="text-sm text-gray-500 mt-1">
              JPG, PNG (Max 10MB)
            </p>
          </div>
        </label>

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg mb-4"
          />
        )}

        {/* Address */}
        <input
          type="text"
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Phone */}
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
        >
          {loading ? "Uploading..." : "Upload Prescription"}
        </button>
      </div>

      {/* RIGHT CARD – How Pharmacist Helps */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          How will the Pharmacist help you?
        </h2>

        <div className="space-y-5 text-gray-700">
          <div className="flex gap-4 items-start">
            <span className="text-xl font-bold text-emerald-600">1</span>
            <p>Pharmacist will check items on prescription and add to cart</p>
          </div>

          <div className="flex gap-4 items-start">
            <span className="text-xl font-bold text-emerald-600">2</span>
            <p>You can ask for additional items if needed</p>
          </div>

          <div className="flex gap-4 items-start">
            <span className="text-xl font-bold text-emerald-600">3</span>
            <p>They will apply the best coupon & get you maximum savings</p>
          </div>

          <div className="flex gap-4 items-start">
            <span className="text-xl font-bold text-emerald-600">4</span>
            <p>Choose the earliest delivery date</p>
          </div>

          <div className="flex gap-4 items-start">
            <span className="text-xl font-bold text-emerald-600">5</span>
            <p>Finally, share payment method options</p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 text-blue-700 p-4 rounded-lg font-semibold">
          🎉 Get up to 25% discount on prescription orders
        </div>
      </div>

      </div>
    </div>
    </div>
  );
}

export default PrescriptionPage;
