// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import PrescriptionPage from "./PrescriptionPage";


// const API_URL = "http://localhost:9091/api/medicines/user/medicines";

// const defaultMedicines = [
//   { id: 1, name: "Paracetamol 500mg", description: "Fever & pain relief", price: 25, image: "/images/Paracetamol-500.jpg" },
//   { id: 2, name: "Amoxicillin 250mg", description: "Antibiotic", price: 20, image: "/images/Amoxicillin 250mg.jpg" },
//   { id: 3, name: "Ibuprofen 400mg", description: "Inflammation relief", price: 50, image: "/images/Ibuprofen 400mg.jpg" },
//   { id: 4, name: "Vitamin C Chewable", description: "Boosts immunity", price: 100, image: "/images/Vitamin_C_Chewable.jpg" },
//   { id: 5, name: "Amlodipine 5mg", description: "Blood pressure control", price: 120, image: "/images/Amlodipine 5mg.jpg" },
//   { id: 6, name: "Dolo 650mg", description: "Fever & pain relief", price: 30, image: "/images/Dolo.jpg" },
//   { id: 7, name: "Cetirizine 10mg", description: "Anti-allergy tablet", price: 15, image: "/images/cetirizine.jpg" },
//   { id: 8, name: "Azithromycin 500mg", description: "Antibiotic", price: 120, image: "/images/Azithromycin.jpg" },
//   { id: 9, name: "Pantoprazole 40mg", description: "Acidity & heartburn relief", price: 60, image: "/images/Pantoprazole.jpg" },
//   { id: 10, name: "ORS Sachet", description: "Rehydration solution", price: 20, image: "/images/ORS_Sachet.jpg" },
//   { id: 11, name: "Dettol Antiseptic Liquid", description: "Disinfects wounds & prevents infection", price: 45, image: "/images/dettol.jpg" },
//   { id: 12, name: "Betadine Ointment", description: "Antiseptic for cuts & burns", price: 60, image: "/images/Betadine_Ointment.jpg" },
//   { id: 13, name: "Burnol Cream", description: "Burn relief antiseptic cream", price: 40, image: "/images/BURNOL-CREAM.jpg" },
//   { id: 14, name: "Band-Aid Strips", description: "Quick wound dressing strips", price: 20, image: "/images/Band-Aid.jpg" },
//   { id: 15, name: "Cotton Roll 50g", description: "For cleaning & dressing wounds", price: 25, image: "/images/Cotton_Roll.jpg" },
// ];

// function UserShop() {
//   const navigate = useNavigate();
//   const [medicines, setMedicines] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchMedicines();
//     loadCart();
//   }, []);

   
//   // ✅ LOGIN → PRESCRIPTION LOGIC
//   const handlePrescriptionClick = () => {
//   const role = localStorage.getItem("role");

//   if (!role) {
//     navigate("/login", { state: { from: "/upload-prescriptions" } });
//   } else {
//     navigate("/upload-prescriptions");
//   }
// };



//   const fetchMedicines = async () => {
//     try {
//       const response = await axios.get(API_URL);

//       const dbMedicines = response.data.map((med) => ({
//         id: Number(med.id),   // 🔥 important
//         name: med.name,
//         description: med.description,
//         price: med.price,
//         image: med.image,
//       }));

//       const combined = [...defaultMedicines];

//       // dbMedicines.forEach((med) => {
//       //   if (!combined.some((d) => d.name.toLowerCase() === med.name.toLowerCase())) {
//       //     combined.push(med);

//         dbMedicines.forEach((med) => {
//         if (!combined.some((d) => d.name.toLowerCase() === med.name.toLowerCase())) {
//         combined.push({ ...med, id: combined.length + 1 }); // assign a new unique id
//         }
//       });

//       setMedicines(combined);
//     } catch (error) {
//       console.error("Failed to fetch medicines:", error);
//       setMedicines(defaultMedicines);
//     }
//   };

//   const loadCart = () => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   };

//   const handleAddToCart = (medicine) => {
//     const updatedCart = [...cart];
//     const index = updatedCart.findIndex((i) => i.id === medicine.id);

//     if (index > -1) {
//       updatedCart[index].quantity += 1;
//     } else {
//       updatedCart.push({
//         id: medicine.id,
//         name: medicine.name,
//         price: medicine.price,
//         quantity: 1,
//       });
//     }

//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     setCart(updatedCart);
//     alert(`${medicine.name} added to cart!`);
//   };

//   const filteredMedicines = medicines.filter((med) =>
//     med.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-sky-200 to-indigo-400 p-6">

//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-indigo-800">🏥 Online Medical Shop</h1>
//         <button
//           onClick={() => navigate("/cart")}
//           className="px-5 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700"
//         >
//           🛒 Cart ({cart.reduce((a, i) => a + i.quantity, 0)})
//         </button>
//       </div>

//       {/* Search */}
//       <input
//         type="text"
//         placeholder="🔍 Search medicines..."
//         className="w-full p-4 mb-6 border rounded-xl shadow-sm"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//      {/* 🔥 Order with Prescription Section */}
// <div className="w-full bg-[#f3f7ff] rounded-2xl p-8 mb-10">
//   <div className="bg-white rounded-2xl p-8 flex flex-col lg:flex-row items-center justify-between gap-10">

//     {/* LEFT SIDE */}
//     <div className="flex items-start gap-6 max-w-xl">
//       {/* Icon / Image */}
//       <div className="bg-blue-100 p-4 rounded-xl">
//         <span className="text-4xl">📄</span>
//       </div>

//       {/* Text */}
//       <div>
//         <h2 className="text-xl font-bold text-gray-900">
//           Order with Prescription
//         </h2>
//         <p className="text-gray-600 mt-1 text-sm">
//           Upload prescription and we will deliver your medicines
//         </p>
//         <button
//             onClick={handlePrescriptionClick}
//             className="mt-4 flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition"
//         >
//           📎 Upload
//         </button>

//       </div>
//     </div>

//     {/* RIGHT SIDE */}
//     <div className="flex-1">
//       <h3 className="text-sm font-semibold text-gray-800 mb-4">
//         How does this work?
//       </h3>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
//         <div className="flex items-start gap-3">
//           <span className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-lg">
//             1
//           </span>
//           <p>Upload a photo of your prescription</p>
//         </div>

//         <div className="flex items-start gap-3">
//           <span className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-lg">
//             3
//           </span>
//           <p>We will call you to confirm the medicines</p>
//         </div>

//         <div className="flex items-start gap-3">
//           <span className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-lg">
//             2
//           </span>
//           <p>Add delivery address and place the order</p>
//         </div>

//         <div className="flex items-start gap-3">
//           <span className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-lg">
//             4
//           </span>
//           <p>Now, sit back! Your medicines will get delivered at your doorstep</p>
//         </div>
//       </div>
//     </div>

//   </div>
// </div>


//       {/* Medicines Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {filteredMedicines.length === 0 ? (
//           <p className="text-center col-span-3 text-gray-600">No medicines found</p>
//         ) : (
//           filteredMedicines.map((med) => (
//             <div key={med.id} className="bg-white rounded-xl shadow-md p-5">
//               <div className="h-32 flex items-center justify-center mb-4">
//                 <img
//                   src={med.image}
//                   alt={med.name}
//                   className="max-h-full max-w-full object-contain"
//                   onError={(e) =>
//                     (e.target.src = "https://via.placeholder.com/150")
//                   }
//                 />
//               </div>

//               <h3 className="text-lg font-semibold text-center">{med.name}</h3>
//               <p className="text-sm text-center text-gray-500">{med.description}</p>
//               <p className="text-center font-bold mt-2 text-emerald-600 text-xl">
//                 ₹{med.price}
//               </p>

//               <button
//                 onClick={() => handleAddToCart(med)}
//                 className="w-full mt-4 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserShop;





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:9091/api/medicines/user/medicines";

const defaultMedicines = [
  { id: 1, name: "Paracetamol 500mg", description: "Fever & pain relief", price: 25, image: "/images/Paracetamol-500.jpg" },
  { id: 2, name: "Amoxicillin 250mg", description: "Antibiotic", price: 20, image: "/images/Amoxicillin 250mg.jpg" },
  { id: 3, name: "Ibuprofen 400mg", description: "Inflammation relief", price: 50, image: "/images/Ibuprofen 400mg.jpg" },
  { id: 4, name: "Vitamin C Chewable", description: "Boosts immunity", price: 100, image: "/images/Vitamin_C_Chewable.jpg" },
  { id: 5, name: "Amlodipine 5mg", description: "Blood pressure control", price: 120, image: "/images/Amlodipine 5mg.jpg" },
  { id: 6, name: "Dolo 650mg", description: "Fever & pain relief", price: 30, image: "/images/Dolo.jpg" },
  { id: 7, name: "Cetirizine 10mg", description: "Anti-allergy tablet", price: 15, image: "/images/cetirizine.jpg" },
  { id: 8, name: "Azithromycin 500mg", description: "Antibiotic", price: 120, image: "/images/Azithromycin.jpg" },
  { id: 9, name: "Pantoprazole 40mg", description: "Acidity & heartburn relief", price: 60, image: "/images/Pantoprazole.jpg" },
  { id: 10, name: "ORS Sachet", description: "Rehydration solution", price: 20, image: "/images/ORS_Sachet.jpg" },
  { id: 11, name: "Dettol Antiseptic Liquid", description: "Disinfects wounds & prevents infection", price: 45, image: "/images/dettol.jpg" },
  { id: 12, name: "Betadine Ointment", description: "Antiseptic for cuts & burns", price: 60, image: "/images/Betadine_Ointment.jpg" },
  { id: 13, name: "Burnol Cream", description: "Burn relief antiseptic cream", price: 40, image: "/images/BURNOL-CREAM.jpg" },
  { id: 14, name: "Band-Aid Strips", description: "Quick wound dressing strips", price: 20, image: "/images/Band-Aid.jpg" },
  { id: 15, name: "Cotton Roll 50g", description: "For cleaning & dressing wounds", price: 25, image: "/images/Cotton_Roll.jpg" },
];

function UserShop() {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicines();
    loadCart();
  }, []);

  // Prescription Navigation
  const handlePrescriptionClick = () => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    
    console.log("Debug - UserID:", userId, "Role:", role);
    
    if (!userId || !role) {
      navigate("/login", { 
        state: { 
          message: "Please login to upload prescription",
          redirectTo: "/upload-prescriptions"
        } 
      });
    } else {
      navigate("/upload-prescriptions");
    }
  };

  // My Orders Navigation
  const handleMyOrdersClick = () => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    
    if (!userId || !role) {
      navigate("/login", { 
        state: { 
          message: "Please login to view your orders",
          redirectTo: "/my-orders"
        } 
      });
    } else {
      navigate("/my-orders");
    }
  };

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);

      const dbMedicines = response.data.map((med) => ({
        id: med.id,
        name: med.name,
        description: med.description,
        price: med.price,
        image: med.imageUrl || med.image,
      }));

      const combined = [...defaultMedicines];
      
      dbMedicines.forEach((med) => {
        const exists = defaultMedicines.some(
          (defaultMed) => defaultMed.name.toLowerCase() === med.name.toLowerCase()
        );
        
        if (!exists) {
          const newMed = {
            ...med,
            id: med.id || combined.length + 1000
          };
          combined.push(newMed);
        }
      });

      setMedicines(combined);
    } catch (error) {
      console.error("Failed to fetch medicines:", error);
      setMedicines(defaultMedicines);
    } finally {
      setLoading(false);
    }
  };

  const loadCart = () => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    } catch (error) {
      console.error("Error loading cart:", error);
      setCart([]);
    }
  };

  const handleAddToCart = (medicine) => {
    try {
      const updatedCart = [...cart];
      const existingItemIndex = updatedCart.findIndex((item) => item.id === medicine.id);

      if (existingItemIndex > -1) {
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
          price: medicine.price
        };
      } else {
        updatedCart.push({
          id: medicine.id,
          name: medicine.name,
          description: medicine.description,
          price: medicine.price,
          image: medicine.image,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
      alert(`✅ ${medicine.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("❌ Failed to add item to cart. Please try again.");
    }
  };

  const handleImageError = (e) => {
    e.target.src = "/images/medicine-placeholder.jpg";
    e.target.onerror = null;
  };

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-100 to-indigo-100 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-900">🏥 MediShop - Online Pharmacy</h1>
          <p className="text-gray-600 mt-1">Your trusted source for genuine medicines</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/cart")}
            className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <span>🛒</span>
            <span>Cart ({totalCartItems})</span>
          </button>
          
          <button
            onClick={handleMyOrdersClick}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
          >
            My Orders
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="🔍 Search medicines by name or description..."
          className="w-full p-4 pl-12 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          🔍
        </div>
      </div>

      {/* Order with Prescription Section */}
      <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-10 border border-blue-100">
        <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-md">
          
          {/* LEFT SIDE */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 max-w-xl">
            {/* Icon / Image */}
            <div className="bg-blue-100 p-5 rounded-2xl flex-shrink-0">
              <span className="text-5xl text-blue-600">📄</span>
            </div>

            {/* Text */}
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                Order with Prescription
              </h2>
              <p className="text-gray-600 mt-2">
                Upload your prescription and we'll handle the rest! Our pharmacists will verify and deliver your medicines.
              </p>
              <button
                onClick={handlePrescriptionClick}
                className="mt-4 flex items-center justify-center sm:justify-start gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                <span className="text-xl">📎</span>
                <span className="font-semibold">Upload Prescription</span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              How It Works:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { step: 1, text: "Upload a clear photo of your prescription" },
                { step: 2, text: "Add delivery address and contact details" },
                { step: 3, text: "Our pharmacist will verify and call you" },
                { step: 4, text: "Medicines delivered to your doorstep" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="bg-blue-600 text-white font-bold px-3 py-1 rounded-full flex-shrink-0">
                    {item.step}
                  </span>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Medicines Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading medicines...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Available Medicines ({filteredMedicines.length})
            </h2>
            {searchTerm && (
              <p className="text-gray-600">
                Search results for: "{searchTerm}"
              </p>
            )}
          </div>

          {filteredMedicines.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <div className="text-6xl mb-4">😕</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No medicines found</h3>
              <p className="text-gray-500">Try searching with different keywords</p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-6 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMedicines.map((med) => (
                <div 
                  key={`${med.id}-${med.name}`} 
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Medicine Image */}
                  <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
                    <img
                      src={med.image || "/images/medicine-placeholder.jpg"}
                      alt={med.name}
                      className="max-h-full max-w-full object-contain"
                      onError={handleImageError}
                      loading="lazy"
                    />
                  </div>

                  {/* Medicine Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
                      {med.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {med.description}
                    </p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-emerald-700">
                        ₹{med.price}
                      </span>
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                        In Stock
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(med)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                    >
                      <span>🛒</span>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Quick Links Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap justify-center gap-6">
          <button
            onClick={() => navigate("/cart")}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            View Cart
          </button>
          <button
            onClick={handlePrescriptionClick}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
          >
            Upload Prescription
          </button>
          <button
            onClick={handleMyOrdersClick}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
          >
            My Orders
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserShop;