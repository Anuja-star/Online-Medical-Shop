// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API_BASE_URL = "http://localhost:9091/api";

// function AdminDashboard({ onLogout }) {
//   const [activePage, setActivePage] = useState("inventory");
//   const [medicines, setMedicines] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [message, setMessage] = useState("");

//   const [newMed, setNewMed] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: "",
//     imageUrl: "",
//   });

//   const [editMed, setEditMed] = useState(null);

//   // ------------------ FETCH MEDICINES ------------------
//   const fetchMedicines = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/medicines/admin/medicines`);
//       setMedicines(res.data);
//     } catch {
//       setMessage("❌ Error fetching medicines");
//     }
//   };

//   // ------------------ FETCH ORDERS ------------------
//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/orders/all`);
//       setOrders(res.data);
//     } catch {
//       setMessage("❌ Error fetching orders");
//     }
//   };

//   useEffect(() => {
//     fetchMedicines();
//     fetchOrders();
//   }, []);

//   // ------------------ ADD MEDICINE ------------------
//   const handleAddMedicine = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_BASE_URL}/medicines/admin/medicines`, newMed);
//       setMessage("✅ Medicine added successfully");
//       setNewMed({ name: "", description: "", price: "", stock: "", imageUrl: "" });
//       fetchMedicines();
//     } catch {
//       setMessage("❌ Error adding medicine");
//     }
//   };

//   // ------------------ DELETE MEDICINE ------------------
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/medicines/admin/medicines/${id}`);
//       fetchMedicines();
//     } catch {
//       setMessage("❌ Delete failed");
//     }
//   };

//   // ------------------ EDIT MEDICINE ------------------
//   const startEdit = (med) => {
//     setEditMed(med);
//     setActivePage("edit");
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`${API_BASE_URL}/medicines/admin/medicines/${editMed.id}`, editMed);
//       setMessage("✅ Medicine updated successfully");
//       setEditMed(null);
//       setActivePage("inventory");
//       fetchMedicines();
//     } catch {
//       setMessage("❌ Update failed");
//     }
//   };

//   // ------------------ UPDATE ORDER STATUS ------------------
//   const updateOrderStatus = async (orderId, status) => {
//     try {
//       await axios.put(`${API_BASE_URL}/orders/${orderId}/status/${status}`);
//       setMessage("✅ Order status updated");
//       fetchOrders();
//     } catch {
//       setMessage("❌ Status update failed");
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* SIDEBAR */}
//       <aside className="w-64 bg-indigo-700 text-white p-5 space-y-3">
//         <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
//         <button onClick={() => setActivePage("inventory")} className="w-full">📦 View Medicines</button>
//         <button onClick={() => setActivePage("add")} className="w-full">➕ Add Medicine</button>
//         <button onClick={() => setActivePage("orders")} className="w-full">🧾 Customer Orders</button>
//         <button onClick={onLogout} className="bg-red-500 w-full py-2 rounded">Logout</button>
//       </aside>

//       {/* CONTENT */}
//       <main className="flex-1 p-6 bg-gray-50">
//         {message && <div className="bg-green-100 p-2 mb-4">{message}</div>}

//         {/* INVENTORY */}
//        {activePage === "inventory" && (
//   <>
//     <h2 className="text-xl font-bold mb-4">Medicines</h2>

//     <table className="w-full bg-white border border-gray-200">
//       <thead className="bg-gray-100">
//         <tr>
//           <th className="p-2 border">ID</th>
//           <th className="p-2 border">Description</th>
//           <th className="p-2 border">Image</th>
//           <th className="p-2 border">Name</th>
//           <th className="p-2 border">Price</th>
//           <th className="p-2 border">Stock</th>
//           <th className="p-2 border">Action</th>
//         </tr>
//       </thead>

//       <tbody>
//         {medicines.map((med) => (
//           <tr key={med.id} className="text-center border-t">
//             {/* ID */}
//             <td className="p-2 border">{med.id}</td>

//             {/* Description */}
//             <td className="p-2 border">{med.description}</td>

//             {/* Image */}
//             <td className="p-2 border">
//               <img
//                 src={med.imageUrl || "/images/placeholder.png"}
//                 alt={med.name}
//                 className="h-10 mx-auto"
//               />
//             </td>

//             {/* Name */}
//             <td className="p-2 border">{med.name}</td>

//             {/* Price */}
//             <td className="p-2 border">₹{med.price}</td>

//             {/* Stock */}
//             <td className="p-2 border">{med.stock}</td>

//             {/* Action */}
//             <td className="p-2 border">
//               <button
//                 onClick={() => startEdit(med)}
//                 className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(med.id)}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </td>
//           </tr>
//              ))}
//            </tbody>
//         </table>
//       </>
//     )}

//         {/* ADD MEDICINE */}
//         {activePage === "add" && (
//           <form onSubmit={handleAddMedicine} className="bg-white p-6 w-96">
//             <input placeholder="Name" className="border p-2 w-full mb-2" value={newMed.name} onChange={(e) => setNewMed({ ...newMed, name: e.target.value })} />
//             <input placeholder="Description" className="border p-2 w-full mb-2" value={newMed.description} onChange={(e) => setNewMed({ ...newMed, description: e.target.value })} />
//              <input placeholder="Image URL" className="border p-2 w-full mb-2" value={newMed.imageUrl} onChange={(e) => setNewMed({ ...newMed, imageUrl: e.target.value })} />
//             <input placeholder="Price" type="number" className="border p-2 w-full mb-2" value={newMed.price} onChange={(e) => setNewMed({ ...newMed, price: e.target.value })} />
//             <input placeholder="Stock" type="number" className="border p-2 w-full mb-2" value={newMed.stock} onChange={(e) => setNewMed({ ...newMed, stock: e.target.value })} />
//             <button className="bg-indigo-600 text-white px-4 py-2">Add</button>
//           </form>
//         )}

//         {/* EDIT MEDICINE */}
//         {activePage === "edit" && editMed && (
//           <form onSubmit={handleEditSubmit} className="bg-white p-6 w-96">
//             <h2 className="font-bold mb-3">Edit Medicine</h2>
//             <input value={editMed.name} className="border p-2 w-full mb-2" onChange={(e) => setEditMed({ ...editMed, name: e.target.value })} />
//             <input value={editMed.price} className="border p-2 w-full mb-2" onChange={(e) => setEditMed({ ...editMed, price: e.target.value })} />
//             <input value={editMed.stock} className="border p-2 w-full mb-2" onChange={(e) => setEditMed({ ...editMed, stock: e.target.value })} />
//             <button className="bg-green-600 text-white px-4 py-2">Update</button>
//           </form>
//         )}

//         {/* ORDERS */}
//         {activePage === "orders" && (
//           <>
//             <h2 className="text-xl font-bold mb-4">Customer Orders</h2>
//             <table className="w-full bg-white border text-sm">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th>ID</th>
//                   <th>Username</th>
//                   <th>Customer Name</th>
//                   <th>Address</th>
//                   <th>Contact</th>
//                   <th>Medicine Name</th>
//                   <th>Quantity</th>
//                   <th>Total Price</th>
//                   <th>Payment Method</th>
//                   <th>Status</th>
//                   <th>Order Time</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((o) => (
//                   <tr key={o.id} className="text-center border-t">
//                     <td>{o.id}</td>
//                     <td>{o.username}</td>
//                     <td>{o.customerName}</td>
//                     <td>{o.address}</td>
//                     <td>{o.contact}</td>
//                     <td>{o.medicineName}</td>
//                     <td>{o.quantity}</td>
//                     <td>₹{o.totalPrice}</td>
//                     <td>{o.paymentMethod}</td>
//                     <td>{o.status}</td>
//                     <td>{o.orderTime?.replace("T", " ")}</td>

//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;









import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:9091/api";

function AdminDashboard({ onLogout }) {
  const [activePage, setActivePage] = useState("inventory");
  const [medicines, setMedicines] = useState([]);
  const [orders, setOrders] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [message, setMessage] = useState("");

  const [newMed, setNewMed] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
  });

  const [editMed, setEditMed] = useState(null);

  // ------------------ FETCH MEDICINES ------------------
  const fetchMedicines = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/medicines/admin/medicines`);
      setMedicines(res.data);
    } catch {
      setMessage("❌ Error fetching medicines");
    }
  };

  // ------------------ FETCH ORDERS ------------------
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/orders/all`);
      setOrders(res.data);
    } catch {
      setMessage("❌ Error fetching orders");
    }
  };

  // ------------------ FETCH PRESCRIPTIONS ------------------
  const fetchPrescriptions = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/prescriptions/admin`);
      setPrescriptions(res.data);
    } catch {
      setMessage("❌ Error fetching prescriptions");
    }
  };

  useEffect(() => {
    fetchMedicines();
    fetchOrders();
  }, []);

  useEffect(() => {
    if (activePage === "prescriptions") {
      fetchPrescriptions();
    }
  }, [activePage]);

  // ------------------ ADD MEDICINE ------------------
  const handleAddMedicine = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/medicines/admin/medicines`, newMed);
      setMessage("✅ Medicine added successfully");
      setNewMed({ name: "", description: "", price: "", stock: "", imageUrl: "" });
      fetchMedicines();
    } catch {
      setMessage("❌ Error adding medicine");
    }
  };

  // ------------------ DELETE MEDICINE ------------------
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/medicines/admin/medicines/${id}`);
      fetchMedicines();
    } catch {
      setMessage("❌ Delete failed");
    }
  };

  // ------------------ EDIT MEDICINE ------------------
  const startEdit = (med) => {
    setEditMed(med);
    setActivePage("edit");
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/medicines/admin/medicines/${editMed.id}`, editMed);
      setMessage("✅ Medicine updated successfully");
      setEditMed(null);
      setActivePage("inventory");
      fetchMedicines();
    } catch {
      setMessage("❌ Update failed");
    }
  };

  // ------------------ UPDATE ORDER STATUS ------------------
  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`${API_BASE_URL}/orders/${orderId}/status/${status}`);
      setMessage("✅ Order status updated");
      fetchOrders();
    } catch {
      setMessage("❌ Status update failed");
    }
  };

  // ------------------ UPDATE PRESCRIPTION STATUS ------------------
  const updatePrescriptionStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/prescriptions/${id}/status/${status}`);
      setMessage("✅ Prescription status updated");
      fetchPrescriptions();
    } catch {
      setMessage("❌ Status update failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR - Background color applied only here */}
      <aside className="w-64 bg-indigo-700 text-white p-5 space-y-3">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <button 
          onClick={() => setActivePage("inventory")} 
          className={`sidebar-btn ${activePage === "inventory" ? "active" : ""}`}
        >
          📦 View Medicines
        </button>
        <button 
          onClick={() => setActivePage("add")} 
          className={`sidebar-btn ${activePage === "add" ? "active" : ""}`}
        >
          ➕ Add Medicine
        </button>
        <button 
          onClick={() => setActivePage("orders")} 
          className={`sidebar-btn ${activePage === "orders" ? "active" : ""}`}
        >
          🧾 Customer Orders
        </button>
        <button 
          onClick={() => setActivePage("prescriptions")} 
          className={`sidebar-btn ${activePage === "prescriptions" ? "active" : ""}`}
        >
          📄 Prescriptions
        </button>
        <button 
          onClick={onLogout} 
          className="sidebar-btn logout"
        >
          Logout
        </button>
      </aside>

      {/* CONTENT - No background color here */}
      <main className="flex-1 p-6 bg-gray-50">
        {message && (
          <div className={`p-3 mb-4 rounded ${message.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {message}
          </div>
        )}

        {/* INVENTORY */}
        {activePage === "inventory" && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Medicines Inventory</h2>
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border border-gray-300">ID</th>
                  <th className="p-3 border border-gray-300">Name</th>
                  <th className="p-3 border border-gray-300">Description</th>
                  <th className="p-3 border border-gray-300">Image</th>
                  <th className="p-3 border border-gray-300">Price</th>
                  <th className="p-3 border border-gray-300">Stock</th>
                  <th className="p-3 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med) => (
                  <tr key={med.id} className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-300 text-center">{med.id}</td>
                    <td className="p-3 border border-gray-300 font-medium">{med.name}</td>
                    <td className="p-3 border border-gray-300">{med.description}</td>
                    <td className="p-3 border border-gray-300">
                      <img 
                        src={med.imageUrl || "/images/placeholder.png"} 
                        alt={med.name} 
                        className="h-12 w-12 object-cover rounded mx-auto" 
                      />
                    </td>
                    <td className="p-3 border border-gray-300 text-center">₹{med.price}</td>
                    <td className="p-3 border border-gray-300 text-center">{med.stock}</td>
                    <td className="p-3 border border-gray-300 text-center">
                      <button 
                        onClick={() => startEdit(med)} 
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(med.id)} 
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ADD MEDICINE */}
        {activePage === "add" && (
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Medicine</h2>
            <form onSubmit={handleAddMedicine} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Medicine Name</label>
                <input 
                  placeholder="Enter medicine name" 
                  className="border border-gray-300 p-3 rounded w-full" 
                  value={newMed.name} 
                  onChange={(e) => setNewMed({ ...newMed, name: e.target.value })} 
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <input 
                  placeholder="Enter description" 
                  className="border border-gray-300 p-3 rounded w-full" 
                  value={newMed.description} 
                  onChange={(e) => setNewMed({ ...newMed, description: e.target.value })} 
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Image URL</label>
                <input 
                  placeholder="Enter image URL" 
                  className="border border-gray-300 p-3 rounded w-full" 
                  value={newMed.imageUrl} 
                  onChange={(e) => setNewMed({ ...newMed, imageUrl: e.target.value })} 
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Price (₹)</label>
                <input 
                  placeholder="Enter price" 
                  type="number" 
                  className="border border-gray-300 p-3 rounded w-full" 
                  value={newMed.price} 
                  onChange={(e) => setNewMed({ ...newMed, price: e.target.value })} 
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Stock Quantity</label>
                <input 
                  placeholder="Enter stock quantity" 
                  type="number" 
                  className="border border-gray-300 p-3 rounded w-full" 
                  value={newMed.stock} 
                  onChange={(e) => setNewMed({ ...newMed, stock: e.target.value })} 
                  required
                  min="0"
                />
              </div>
              <button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded w-full"
              >
                Add Medicine
              </button>
            </form>
          </div>
        )}

        {/* EDIT MEDICINE */}
        {activePage === "edit" && editMed && (
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Medicine</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Medicine Name</label>
                <input 
                  value={editMed.name} 
                  className="border border-gray-300 p-3 rounded w-full" 
                  onChange={(e) => setEditMed({ ...editMed, name: e.target.value })} 
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <input 
                  value={editMed.description || ""} 
                  className="border border-gray-300 p-3 rounded w-full" 
                  onChange={(e) => setEditMed({ ...editMed, description: e.target.value })} 
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Price (₹)</label>
                <input 
                  value={editMed.price} 
                  type="number"
                  className="border border-gray-300 p-3 rounded w-full" 
                  onChange={(e) => setEditMed({ ...editMed, price: e.target.value })} 
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Stock Quantity</label>
                <input 
                  value={editMed.stock} 
                  type="number"
                  className="border border-gray-300 p-3 rounded w-full" 
                  onChange={(e) => setEditMed({ ...editMed, stock: e.target.value })} 
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Image URL</label>
                <input 
                  value={editMed.imageUrl || ""} 
                  className="border border-gray-300 p-3 rounded w-full" 
                  onChange={(e) => setEditMed({ ...editMed, imageUrl: e.target.value })} 
                />
              </div>
              <div className="flex gap-3">
                <button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded flex-1"
                >
                  Update Medicine
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setEditMed(null);
                    setActivePage("inventory");
                  }} 
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-3 rounded flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ORDERS */}
        {activePage === "orders" && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border border-gray-300">Order ID</th>
                    <th className="p-3 border border-gray-300">Customer</th>
                    <th className="p-3 border border-gray-300">Address</th>
                    <th className="p-3 border border-gray-300">Contact</th>
                    <th className="p-3 border border-gray-300">Medicine</th>
{/* // <th className="p-3 border border-gray-300">Qty</th> */}
                    <th className="p-3 border border-gray-300">Total</th>
                    <th className="p-3 border border-gray-300">Payment</th>
                    <th className="p-3 border border-gray-300">Status</th>
                    <th className="p-3 border border-gray-300">Order Time</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50">
                      <td className="p-3 border border-gray-300 text-center">{o.id}</td>
                      <td className="p-3 border border-gray-300">{o.customerName}</td>
                      <td className="p-3 border border-gray-300">{o.address}</td>
                      <td className="p-3 border border-gray-300">{o.contact}</td>
                      <td className="p-3 border border-gray-300">{o.medicineName}</td>
                      {/* <td className="p-3 border border-gray-300 text-center">{o.quantity}</td> */}
                      <td className="p-3 border border-gray-300 text-center">₹{o.totalPrice}</td>
                      <td className="p-3 border border-gray-300 text-center">{o.paymentMethod}</td>
                      <td className="p-3 border border-gray-300 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          o.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                          o.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="p-3 border border-gray-300 text-center">{o.orderTime?.replace("T", " ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRESCRIPTIONS */}
        {activePage === "prescriptions" && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Prescription Requests</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border border-gray-300">ID</th>
                    <th className="p-3 border border-gray-300">Username</th>
                    <th className="p-3 border border-gray-300">Prescription</th>
                    <th className="p-3 border border-gray-300">Address</th>
                    <th className="p-3 border border-gray-300">Phone</th>
                    <th className="p-3 border border-gray-300">Status</th>
                    <th className="p-3 border border-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="p-3 border border-gray-300 text-center">{p.id}</td>
                      <td className="p-3 border border-gray-300">{p.user?.username}</td>
                      <td className="p-3 border border-gray-300">
                        <img
                          src={`http://localhost:9091/api/prescriptions/image/${p.imageUrl}`}
                          alt="Prescription"
                          className="h-20 w-auto mx-auto border border-gray-300 rounded"
                        />
                      </td>
                      <td className="p-3 border border-gray-300">{p.address}</td>
                      <td className="p-3 border border-gray-300">{p.phone}</td>
                      <td className="p-3 border border-gray-300 text-center">
                        <span className={`px-2 py-1 rounded text-sm ${
                          p.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                          p.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3 border border-gray-300 text-center">
                        <select
                          value={p.status}
                          onChange={(e) => updatePrescriptionStatus(p.id, e.target.value)}
                          className="border border-gray-300 p-2 rounded bg-white"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="APPROVED">APPROVED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* CSS Styles */}
      <style jsx>{`
        .sidebar-btn {
          width: 100%;
          padding: 14px 16px;
          margin-bottom: 12px;
          background: hsl(210, 7%, 94%);
          color: #140303;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          text-align: left;
          font-size: 18px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: all 0.3s ease;
        }

        .sidebar-btn:hover {
          background: #4b5563;
          color: white;
        }

        .sidebar-btn .icon {
          font-size: 20px;
        }

        /* Active menu */
        .sidebar-btn.active {
          background: #facc15;
          color: #111827;
        }

        /* Logout */
        .logout {
          background: hsl(8, 90%, 47%);
          color: white;
          margin-top: 20px;
        }

        .logout:hover {
          background: #b91c1c;
        }
      `}</style>
    </div>
  );
}

export default AdminDashboard;


