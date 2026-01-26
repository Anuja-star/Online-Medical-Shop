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
  const [errorMessage, setErrorMessage] = useState("");

  // Handle file selection with validation
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    if (!validTypes.includes(selectedFile.type)) {
      setErrorMessage("Please upload only image files (JPEG, PNG, GIF, WebP)");
      e.target.value = ""; // Clear the file input
      return;
    }
    
    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > maxSize) {
      setErrorMessage("File size should be less than 5MB");
      e.target.value = ""; // Clear the file input
      return;
    }
    
    setFile(selectedFile);
    setErrorMessage(""); // Clear any previous errors
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Validate phone number
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  // Handle form submit with enhanced error handling
  const handleSubmit = async () => {
  setErrorMessage("");

  if (!file) {
    setErrorMessage("Please upload prescription");
    return;
  }

  if (!address.trim()) {
    setErrorMessage("Enter address");
    return;
  }

  if (!validatePhone(phone)) {
    setErrorMessage("Enter valid phone number");
    return;
  }

  const formData = new FormData();
  formData.append("file", file); // ✅ BACKEND MATCH
  formData.append("address", address.trim());
  formData.append("phone", phone.trim());

  console.log("FormData contents:");
  for (let [k, v] of formData.entries()) {
    console.log(k, v);
  }

  try {
    setLoading(true);

    const response = await axios.post(
      "http://localhost:9091/api/prescriptions/upload/4",
      formData
    );

    alert("Prescription uploaded successfully");

    setFile(null);
    setAddress("");
    setPhone("");
    setPreview(null);
  } catch (error) {
    console.error(error);
    setErrorMessage("Upload failed. Please check backend.");
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

            {/* Error Message Display */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Upload Box */}
            <label className="block cursor-pointer mb-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="prescription-upload"
              />
              <div className="border-2 border-dashed border-emerald-400 rounded-xl p-8 text-center hover:bg-emerald-50 transition">
                <div className="text-4xl mb-2">📄</div>
                <p className="text-emerald-600 font-semibold text-lg">
                  Click to upload prescription
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Supports: JPG, PNG, GIF, WebP (Max 5MB)
                </p>
                {file && (
                  <p className="text-sm text-gray-700 mt-2">
                    Selected: <span className="font-semibold">{file.name}</span>
                  </p>
                )}
              </div>
            </label>

            {/* Preview */}
            {preview && (
              <div className="mb-6">
                <p className="text-gray-700 font-medium mb-2">Preview:</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-w-xs h-auto object-contain rounded-lg border border-gray-300"
                />
                <button
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                    setErrorMessage("");
                    const fileInput = document.querySelector('input[type="file"]');
                    if (fileInput) fileInput.value = "";
                  }}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove Image
                </button>
              </div>
            )}

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Delivery Address *
              </label>
              <textarea
                placeholder="Enter your complete delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                rows="3"
              />
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                placeholder="Enter 10-digit phone number"
                value={phone}
                onChange={(e) => {
                  // Allow only numbers
                  const value = e.target.value.replace(/\D/g, '');
                  setPhone(value);
                }}
                maxLength="10"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll use this to contact you regarding your order
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Uploading...
                </>
              ) : (
                "Upload Prescription"
              )}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              By uploading, you agree to our terms and privacy policy
            </p>
          </div>

          {/* RIGHT CARD – How Pharmacist Helps */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How will the Pharmacist help you?
            </h2>

            <div className="space-y-5 text-gray-700 mb-8">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <p className="pt-1">Pharmacist will check items on prescription and add to cart</p>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <p className="pt-1">You can ask for additional items if needed</p>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <p className="pt-1">They will apply the best coupon & get you maximum savings</p>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <p className="pt-1">Choose the earliest delivery date</p>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                  5
                </div>
                <p className="pt-1">Finally, share payment method options</p>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 text-blue-800 p-5 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎉</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">Special Offer!</h3>
                  <p className="font-semibold">Get up to 25% discount on prescription orders</p>
                  <p className="text-sm mt-1">Valid for first-time prescription uploads only</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-2">
                📞 Call us: <span className="font-semibold">1800-XXX-XXXX</span>
              </p>
              <p className="text-sm text-gray-600">
                ⏰ Service hours: 8 AM - 10 PM, 7 days a week
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrescriptionPage;






