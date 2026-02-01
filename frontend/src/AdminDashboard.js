import React, { useState, useEffect } from "react";
import axios from "axios";

//const API_BASE_URL = "http://localhost:9091/api";
const API_BASE_URL = "https://online-medical-shop-production.up.railway.app/api";


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
    file: null,
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
    if (activePage === "prescriptions") fetchPrescriptions();
  }, [activePage]);

  // ------------------ ADD MEDICINE ------------------
  const handleAddMedicine = async (e) => {
  e.preventDefault();

  if (!newMed.name || !newMed.price || !newMed.stock || !newMed.file) {
    setMessage("❌ Please fill all required fields");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("name", newMed.name);
    formData.append("description", newMed.description);
    formData.append("price", newMed.price);
    formData.append("stock", newMed.stock);
    formData.append("file", newMed.file); // 🔥 MUST be "file"

    await axios.post(
      `${API_BASE_URL}/medicines/admin/medicines`,
      formData
    );

    setMessage("✅ Medicine added successfully");
    setNewMed({
      name: "",
      description: "",
      price: "",
      stock: "",
      file: null
    });

    fetchMedicines();
    setActivePage("inventory");

  } catch (error) {
    console.error(error.response?.data || error);
    setMessage("❌ Error adding medicine");
  }
};


  // ------------------ DELETE MEDICINE ------------------
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/medicines/admin/medicines/${id}`);
      setMessage("✅ Medicine deleted successfully");
      fetchMedicines();
    } catch {
      setMessage("❌ Delete failed");
    }
  };

  // ------------------ EDIT MEDICINE ------------------
  const startEdit = (med) => {
    setEditMed({ ...med, file: null });
    setActivePage("edit");
  };

  const handleEditSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.put(
      `${API_BASE_URL}/medicines/admin/medicines/${editMed.id}`,
      {
        name: editMed.name,
        description: editMed.description,
        price: Number(editMed.price),
        stock: Number(editMed.stock),
        imageUrl: editMed.imageUrl
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Updated:", res.data);
    alert("✅ Medicine updated successfully");
  } catch (error) {
    console.log("Update Error FULL:", error);
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
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
      {/* SIDEBAR */}
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
        <button onClick={onLogout} className="sidebar-btn logout">Logout</button>
      </aside>

      {/* CONTENT */}
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
                <label className="block text-gray-700 mb-2">Upload Image</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="border border-gray-300 p-3 rounded w-full" 
                  onChange={(e) => setNewMed({ ...newMed, file: e.target.files[0] })} 
                  required
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
                <label className="block text-gray-700 mb-2">Upload New Image</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="border border-gray-300 p-3 rounded w-full" 
                  onChange={(e) => setEditMed({ ...editMed, file: e.target.files[0] })} 
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
                    <th className="p-3 border border-gray-300">Qty</th>
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
                      <td className="p-3 border border-gray-300 text-center">{o.quantity}</td>
                      <td className="p-3 border border-gray-300 text-center">₹{o.totalPrice}</td>
                      <td className="p-3 border border-gray-300 text-center">{o.paymentMethod}</td>
                      <td className="p-3 border border-gray-300 text-center">
                        <select
                          value={o.status || "PENDING"}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                          className="border border-gray-300 p-2 rounded bg-white"
                        >
                          <option value="PLACED">PLACED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td className="p-3 border border-gray-300 text-center">
                        {o.orderTime ? o.orderTime.replace("T", " ") : "N/A"}
                      </td>
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
                        <a
                  href={`http://localhost:9091/api/prescriptions/image/${p.imageUrl}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="View full size"
                >
                        <img
                          src={`http://localhost:9091/api/prescriptions/image/${p.imageUrl}`}
                          alt="Prescription"
                          className="h-20 w-auto mx-auto border border-gray-300 rounded"
                        /></a>
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
                          value={p.status || "PENDING"}
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

      {/* Sidebar CSS */}
      <style>{`
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
        .sidebar-btn.active {
          background: #facc15; 
          color: #111827; 
        }
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


