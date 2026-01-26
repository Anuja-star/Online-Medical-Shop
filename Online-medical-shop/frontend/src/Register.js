import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("❌ Passwords do not match!");
      return;
    }

    alert(`✅ Registered successfully!\nWelcome, ${username}!`);
    navigate("/login"); // Redirect to login page
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/medical.jpg')" }
    }
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 bg-white/20 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-lg">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">
              Username
            </label>
            <input
              type="text"
              required value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/70 focus:bg-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">
              Email
            </label>
            <input
              type="email"
              required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/70 focus:bg-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">
              Password
            </label>
            <input
              type="password"
              required value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/70 focus:bg-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/70 focus:bg-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Register button */}
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Register
          </button>

          {/* Go to Login button */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full mt-3 px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400 transition duration-200"
          >
            Go to Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
