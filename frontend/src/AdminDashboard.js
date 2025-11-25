import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:9091";

function AdminDashboard({ onLogout }) {
  const [activePage, setActivePage] = useState("inventory");

  const [medicines, setMedicines] = useState([]);
  const [orders, setOrders] = useState([]);

  const [newMed, setNewMed] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [editMed, setEditMed] = useState(null);
  const [message, setMessage] = useState("");

  // ------------------ FETCH MEDICINES ------------------
  const fetchMedicines = () => {
    axios
      .get(`${API_BASE_URL}/api/medicines`)
      .then((res) => setMedicines(res.data))
      .catch(() => setMessage("❌ Error fetching medicines"));
  };

  // ------------------ FETCH ORDERS ------------------
  const fetchOrders = () => {
    axios
      .get(`${API_BASE_URL}/api/orders`)
      .then((res) => setOrders(res.data))
      .catch(() => setMessage("❌ Error fetching orders"));
  };

  useEffect(() => {
    fetchMedicines();
    fetchOrders();
  }, []);

  // ------------------ ADD MEDICINE ------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_BASE_URL}/api/medicines`, newMed)
      .then(() => {
        setMessage("✅ Medicine added successfully!");
        fetchMedicines();
        setNewMed({ name: "", description: "", price: "", stock: "" });
      })
      .catch(() => setMessage("❌ Error adding medicine"));
  };

  // ------------------ DELETE MEDICINE ------------------
  const handleDelete = (id) => {
    axios
      .delete(`${API_BASE_URL}/api/medicines/${id}`)
      .then(() => {
        setMessage("🗑 Medicine deleted!");
        fetchMedicines();
      })
      .catch(() => setMessage("❌ Error deleting"));
  };

  // ------------------ EDIT MEDICINE ------------------
  const handleEdit = (id, updateMed) => {
    axios
      .put(`${API_BASE_URL}/api/medicines/${id}`, updateMed)
      .then(() => {
        setMessage("✏ Medicine updated!");
        fetchMedicines();
        setEditMed(null);
      })
      .catch(() => setMessage("❌ Error updating"));
  };

  return (
    <div className="flex min-h-screen">
      {/* ---------------- SIDE BAR ---------------- */}
      <aside className="w-64 bg-indigo-700 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <button
          className={`block w-full text-left px-3 py-2 rounded ${
            activePage === "inventory" ? "bg-indigo-500" : ""
          }`}
          onClick={() => setActivePage("inventory")}
        >
          📦 Medicine Inventory
        </button>

        <button
          className={`block w-full text-left px-3 py-2 rounded ${
            activePage === "add" ? "bg-indigo-500" : ""
          }`}
          onClick={() => setActivePage("add")}
        >
          ➕ Add Medicine
        </button>

        <button
          className={`block w-full text-left px-3 py-2 rounded ${
            activePage === "orders" ? "bg-indigo-500" : ""
          }`}
          onClick={() => setActivePage("orders")}
        >
          🧾 Customer Orders
        </button>

        <button
          onClick={onLogout}
          className="block w-full text-left bg-red-500 px-3 py-2 rounded mt-10"
        >
          🔴 Logout
        </button>
      </aside>

      {/* ---------------- CONTENT ---------------- */}
      <main className="flex-1 p-6 bg-gray-50">
        {message && (
          <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
            {message}
          </div>
        )}

        {/* -------- PAGE: MEDICINE INVENTORY -------- */}
        {activePage === "inventory" && (
          <>
            <h2 className="text-2xl font-bold mb-4">📦 Medicine Inventory</h2>

            <table className="min-w-full border bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Stock</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {medicines.map((med) => (
                  <tr key={med.id} className="text-center border">
                    <td className="border p-2">{med.id}</td>
                    <td className="border p-2">{med.name}</td>
                    <td className="border p-2">{med.description}</td>
                    <td className="border p-2">₹{med.price}</td>
                    <td className="border p-2">{med.stock}</td>
                    <td className="border p-2 space-x-2">
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => setEditMed(med)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(med.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ----- EDIT FORM ----- */}
            {editMed && (
              <div className="bg-white shadow p-4 mt-4 rounded">
                <h3 className="font-bold mb-2">Edit Medicine</h3>

                <div className="grid grid-cols-4 gap-2">
                  <input
                    value={editMed.name}
                    onChange={(e) =>
                      setEditMed({ ...editMed, name: e.target.value })
                    }
                    className="border p-2"
                  />

                  <input
                    value={editMed.description}
                    onChange={(e) =>
                      setEditMed({ ...editMed, description: e.target.value })
                    }
                    className="border p-2"
                  />

                  <input
                    value={editMed.price}
                    onChange={(e) =>
                      setEditMed({ ...editMed, price: e.target.value })
                    }
                    className="border p-2"
                  />

                  <input
                    value={editMed.stock}
                    onChange={(e) =>
                      setEditMed({ ...editMed, stock: e.target.value })
                    }
                    className="border p-2"
                  />
                </div>

                <button
                  onClick={() => handleEdit(editMed.id, editMed)}
                  className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            )}
          </>
        )}

        {/* -------- PAGE: ADD MEDICINE -------- */}
        {activePage === "add" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">➕ Add Medicine</h2>

            <form
              onSubmit={handleSubmit}
              className="bg-white p-5 shadow rounded w-full md:w-1/2"
            >
              <input
                className="border p-2 w-full mb-3"
                name="name"
                placeholder="Name"
                value={newMed.name}
                onChange={(e) =>
                  setNewMed({ ...newMed, name: e.target.value })
                }
                required
              />

              <input
                className="border p-2 w-full mb-3"
                name="description"
                placeholder="Description"
                value={newMed.description}
                onChange={(e) =>
                  setNewMed({ ...newMed, description: e.target.value })
                }
                required
              />

              <input
                className="border p-2 w-full mb-3"
                name="price"
                type="number"
                placeholder="Price"
                value={newMed.price}
                onChange={(e) =>
                  setNewMed({ ...newMed, price: e.target.value })
                }
                required
              />

              <input
                className="border p-2 w-full mb-3"
                name="stock"
                type="number"
                placeholder="Stock"
                value={newMed.stock}
                onChange={(e) =>
                  setNewMed({ ...newMed, stock: e.target.value })
                }
                required
              />

              <button className="bg-indigo-600 text-white px-4 py-2 rounded">
                Add Medicine
              </button>
            </form>
          </div>
        )}

        {/* -------- PAGE: ORDERS -------- */}
        {activePage === "orders" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">🧾 Customer Orders</h2>

            <table className="min-w-full border bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Order ID</th>
                  <th className="border p-2">Customer Name</th>
                  <th className="border p-2">Medicine</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Total Price</th>
                  <th className="border p-2">Payment</th>
                  <th className="border p-2">Order Time</th>
                  <th className="border p-2">Address</th>
                  <th className="border p-2">Contact</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="text-center border">
                    <td className="border p-2">{o.id}</td>
                    <td className="border p-2">{o.customerName}</td>
                    <td className="border p-2">{o.medicineName}</td>
                    <td className="border p-2">{o.quantity}</td>
                    <td className="border p-2">₹{o.totalPrice}</td>
                    <td className="border p-2">{o.paymentMethod}</td>
                    <td className="border p-2">
                      {o.orderTime ? o.orderTime.split("T")[0] : "-"}
                    </td>
                    <td className="border p-2">{o.address}</td>
                    <td className="border p-2">{o.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
