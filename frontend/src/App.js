import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import LandingPage from "./LandingPage";
import Login from "./Login";
import Register from "./Register";
import AdminDashboard from "./AdminDashboard";
import UserShop from "./components/UserShop";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import OrderSuccess from "./components/OrderSuccess";

function AppWrapper() {
  const navigate = useNavigate();

  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");

  const handleLogin = (username, password, type) => {
    if (type === "admin" && username === "admin" && password === "pass") {
      // Save to localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("role", "admin");

      setRole("admin");
      setToken("admin_token");
      navigate("/admin");

    } else if (type === "user") {
     
      localStorage.setItem("username", username);
      localStorage.setItem("role", "user");

      setRole("user");
      setToken("user_token");
      navigate("/shop");

    } else {
      setMessage("❌ Invalid credentials");
    }
  };

  
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setRole(null);
    setToken(null);
    navigate("/");
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/login"
        element={<Login onLogin={handleLogin} message={message} />}
      />

      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          role === "admin" ? (
            <AdminDashboard onLogout={handleLogout} />
          ) : (
            <LandingPage />
          )
        }
      />

      <Route
        path="/shop"
        element={
          <UserShop token={token} onLogout={handleLogout} setMessage={setMessage} />
        }
      />

      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/success" element={<OrderSuccess />} />

    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;

