// import React from "react";
// import { Link } from "react-router-dom";

// function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-300 mt-10">
//       <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">

//         {/* Brand */}
//         <div>
//           <h2 className="text-2xl font-bold text-white mb-3">💊 MediShop</h2>
//           <ol className="text-sm">
//            <li> Your trusted online medical store.</li>
//             <li> • Safe </li>
//             <li> • Fast </li>
//             <li>• Reliable</li>
//           </ol>
//         </div>

//         {/* Quick Links */}
//         {/* <div> */}
//           {/* <h3 className="text-lg font-semibold text-white mb-3"> */}
//             {/* Quick Links
//           </h3>
//           <ul className="space-y-2 text-sm">
//             <li><Link to="/" className="hover:text-white">Home</Link></li>
//             <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
//             <li><Link to="/login" className="hover:text-white">Login</Link></li>
//             <li><Link to="/register" className="hover:text-white">Register</Link></li>
//           </ul> */}
//         {/* </div> */}

//         {/* Contact */}
//         {/* <div>
//           <h3 className="text-lg font-semibold text-white mb-3">
//             Contact Us
//           </h3>
//           <ul className="space-y-5 text-sm">
//             <li>📞 +91 98760 43210</li>
//             <li>📧 support@medishop.com</li>
//             <li>📍 Pune, Maharashtra</li>
//           </ul>
//         </div> */}

//         {/* Social Media */}
//         <div>
//           <h3 className="text-lg font-semibold text-white mb-3">
//             Follow Us
//           </h3>
//           <div className="flex space-x-6 text-xl">
//             <a href="#" className="hover:text-white">🌐</a>
//             <a href="#" className="hover:text-white">📘</a>
//             <a href="#" className="hover:text-white">📸</a>
//             <a href="#" className="hover:text-white">💊</a> 
//           </div>
//         </div>
//       </div>

//       {/* Bottom bar */}
//       <div className="bg-black text-center py-4 text-sm text-gray-400">
//         © {new Date().getFullYear()} MediShop. All rights reserved.
//       </div>
//     </footer>
//   );
// }

// export default Footer;


import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-3 gap-15">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">💊 MediShop</h2>
          <ul className="text-sm space-y-1">
            <li>Your trusted online medical store</li>
            <li>• Safe</li>
            <li>• Fast</li>
            <li>• Reliable</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm">
            <li>📞 +91 98760 43210</li>
            <li>📧 support@medishop.com</li>
            <li>📍 Pune, Maharashtra</li>
          </ul>
        </div>

        {/* Simple Social / Medicine Icons */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Follow Us
          </h3>
          <div className="flex space-x-6 text-xl">
            <a href="#" className="hover:text-white">💊</a>
            <a href="#" className="hover:text-white">🩺</a>
            <a href="#" className="hover:text-white">🏥</a>
            <a href="#" className="hover:text-white">🧴</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-black text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} MediShop. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
