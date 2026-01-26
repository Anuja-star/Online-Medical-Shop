import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  FileText,
  Repeat,
  Eye,
  Hash
} from "lucide-react";

const API_BASE_URL = "http://localhost:9091/api";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  const username = localStorage.getItem("username");

  // ================= FETCH ORDERS =================
  const fetchOrders = async () => {
    try {
      console.log("Fetching orders for:", username); // DEBUG

      const res = await axios.get(
        `${API_BASE_URL}/orders/user/${username}`
      );

      console.log("Orders from API:", res.data); // DEBUG
      setOrders(res.data || []);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  useEffect(() => {
    if (username) {
      fetchOrders();
    } else {
      console.error("Username not found in localStorage");
    }
  }, []);

  // ================= STATUS CONFIG =================
  const statusConfig = {
    DELIVERED: {
      icon: <CheckCircle size={16} />,
      color: "bg-green-100 text-green-800",
      label: "Delivered"
    },
    PROCESSING: {
      icon: <Clock size={16} />,
      color: "bg-yellow-100 text-yellow-800",
      label: "Processing"
    },
    CANCELLED: {
      icon: <AlertCircle size={16} />,
      color: "bg-red-100 text-red-800",
      label: "Cancelled"
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter(o => o.status === filter);

  const formatNumber = num =>
    Number(num || 0).toLocaleString("en-IN");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border"
          >
            <ArrowLeft size={18} /> Back
          </button>

          <h1 className="text-3xl font-bold">Order History</h1>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Orders" value={orders.length} icon={<Package />} />
          <StatCard
            title="Delivered"
            value={orders.filter(o => o.status === "DELIVERED").length}
            icon={<CheckCircle />}
          />
          <StatCard
            title="Total Value"
            value={formatNumber(
              orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0)
            )}
            icon={<Hash />}
          />
        </div>

        {/* FILTER */}
        <div className="mb-6 flex items-center gap-4">
          <Filter size={18} />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="border px-4 py-2 rounded"
          >
            <option value="all">All</option>
            <option value="DELIVERED">Delivered</option>
            <option value="PROCESSING">Processing</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* ORDERS */}
        <div className="space-y-4">
          {filteredOrders.map(order => {
            const status = statusConfig[order.status] || {};
            return (
              <div key={order.id} className="bg-white p-6 rounded-xl border">
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">
                      {order.medicineName || "Medicine"}
                    </h3>
                    <p className="text-gray-500">
                      {new Date(order.orderTime).toLocaleString()}
                    </p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-sm ${status.color}`}>
                    {status.icon} {status.label}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">
                    ₹ {formatNumber(order.totalPrice)}
                  </p>

                  <div className="flex gap-3">
                    <button className="btn">
                      <FileText size={16} />
                    </button>
                    <button className="btn">
                      <Repeat size={16} />
                    </button>
                    <button
                      onClick={() => navigate(`/orders/${order.id}`)}
                      className="btn-primary"
                    >
                      <Eye size={16} /> View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* EMPTY */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <Package size={60} className="mx-auto mb-4" />
            No orders found
          </div>
        )}

      </div>
    </div>
  );
};

// ================= STAT CARD =================
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-5 rounded-xl border flex justify-between">
    <div>
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <div className="text-blue-600">{icon}</div>
  </div>
);

export default OrderHistory;
