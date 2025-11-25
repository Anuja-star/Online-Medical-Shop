import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserShop({ onLogout }) {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Add search state

  // Load sample medicine data
  useEffect(() => {
    const sampleMedicines = [
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

    setMedicines(sampleMedicines);

    // Load existing cart
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(existingCart);
  }, []);

  // Add item to cart
  const handleAddToCart = (medicine) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find((item) => item.id === medicine.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ ...medicine, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCart(existingCart);

    alert(`${medicine.name} added to cart!`);
  };

  const goToCart = () => {
    navigate("/cart");
  };

  // Filter medicines by search text
  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">
          🏥 Online Medical Shop
        </h1>

        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/*  Cart Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={goToCart}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          View Cart ({cart.length})
        </button>
      </div>

      {/*  Search Bar */}
      <input
        type="text"
        placeholder="Search medicines..."
        className="w-full p-3 mb-6 border rounded-lg shadow-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Medicine Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.length === 0 ? (
          <p className="text-gray-500 text-center col-span-3 text-lg">
            ❌ No medicines found.
          </p>
        ) : (
          filteredMedicines.map((med) => (
            <div
              key={med.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={med.image}
                alt={med.name}
                className="w-32 h-32 object-cover rounded-md mb-3 mx-auto"
              />

              <h3 className="text-lg font-bold text-indigo-700">{med.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{med.description}</p>

              <p className="font-semibold text-green-600 mb-3">
                ₹{med.price.toFixed(2)}
              </p>

              <button
                onClick={() => handleAddToCart(med)}
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserShop;


