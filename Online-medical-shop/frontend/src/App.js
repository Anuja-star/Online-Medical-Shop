// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// import LandingPage from "./LandingPage";
// import Login from "./Login";
// import Register from "./Register";
// import AdminDashboard from "./AdminDashboard";
// import UserShop from "./components/UserShop";
// import PrescriptionPage from "./components/PrescriptionPage";
// import CartPage from "./components/CartPage";
// import CheckoutPage from "./components/CheckoutPage";
// import OrderSuccess from "./components/OrderSuccess";

// function AppWrapper() {
//   const navigate = useNavigate();

//   const [role, setRole] = useState(localStorage.getItem("role") || null);
//   const [token, setToken] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleLogin = async (username, password, type) => {
//     try {
//       // TODO: Replace this block with actual backend API call
//       // Example: axios.post("/api/auth/login", { username, password })
//       if (type === "admin" && username === "admin" && password === "pass") {
//         localStorage.setItem("username", username);
//         localStorage.setItem("role", "ADMIN"); // match backend role
//         setRole("ADMIN");
//         setToken("admin_token");
//         navigate("/admin");
//       } else if (type === "user") {
//         localStorage.setItem("username", username);
//         localStorage.setItem("role", "USER"); // match backend role
//         setRole("USER");
//         setToken("user_token");
//         navigate("/shop");
//       } else {
//         setMessage("❌ Invalid credentials");
//       }
//     } catch (error) {
//       setMessage("❌ Login failed. Please try again.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("username");
//     localStorage.removeItem("role");
//     setRole(null);
//     setToken(null);
//     navigate("/");
//   };

//   return (
//     <Routes>
//       <Route path="/" element={<LandingPage />} />
//       <Route path="/login" element={<Login onLogin={handleLogin} message={message} />} />
//       <Route path="/register" element={<Register />} />

//       <Route
//         path="/admin"
//         element={role === "ADMIN" ? <AdminDashboard onLogout={handleLogout} /> : <LandingPage />}
//       />

//       <Route
//         path="/shop"
//         element={<UserShop token={token} onLogout={handleLogout} setMessage={setMessage} />}
//       />
//       <Route path="/upload-prescriptions" element={<PrescriptionPage />} />

//       <Route path="/cart" element={<CartPage />} />
//       <Route path="/checkout" element={<CheckoutPage />} />
//       <Route path="/success" element={<OrderSuccess />} />
//     </Routes>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppWrapper />
//     </Router>
//   );
// }

// export default App;





import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import LandingPage from "./LandingPage";
import Login from "./Login";
import Register from "./Register";
import AdminDashboard from "./AdminDashboard";
import UserShop from "./components/UserShop";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import PrescriptionPage from "./components/PrescriptionPage";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import OrderSuccess from "./components/OrderSuccess";
import OrderHistory from "./components/OrderHistory";

function AppWrapper() {
  const navigate = useNavigate();

  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");

  const handleLogin = async (username, password, type) => {
    try {
      // Dummy backend login simulation
      if (type === "admin" && username === "admin" && password === "pass") {
        localStorage.setItem("userId", 0); // Admin id
        localStorage.setItem("username", username);
        localStorage.setItem("role", "ADMIN");
        setRole("ADMIN");
        setToken("admin_token");
        navigate("/admin");
      } else if (type === "user") {
        const dummyUserId = 1; // Temporary user ID
        localStorage.setItem("userId", dummyUserId);
        localStorage.setItem("username", username);
        localStorage.setItem("role", "USER");
        setRole("USER");
        setToken("user_token");
        navigate("/shop");
      } else {
        setMessage({ type: "error", text: "❌ Invalid credentials" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "❌ Login failed. Please try again." });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId"); // 🔥 Important
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setRole(null);
    setToken(null);
    navigate("/");
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login onLogin={handleLogin} message={message} />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin"
        element={role === "ADMIN" ? <AdminDashboard onLogout={handleLogout} /> : <LandingPage />}
      />

      <Route
        path="/shop"
        element={<UserShop token={token} onLogout={handleLogout} setMessage={setMessage} />}
      />

      <Route path="/upload-prescriptions" element={<PrescriptionPage />} />
      <Route path="/my-orders" element={<OrderHistory />} />
       <Route path="/about" element={<AboutPage />} />
       <Route path="/contact" element={<ContactPage />} />
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
