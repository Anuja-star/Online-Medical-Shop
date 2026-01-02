import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  CheckCircle, 
  Clock, 
  Truck, 
  AlertCircle,
  Filter,
  Search,
  Download,
  FileText,
  Repeat,
  Eye,
  Calendar,
  Hash
} from 'lucide-react';

const OrderHistory = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const orders = [
    {
      id: 'ORD-78945',
      date: '2025-10-15',
      items: 3,
      total: 140,
      status: 'delivered',
      tracking: 'TRK-789456123',
      itemsList: ['Multivitamin Complex', 'Vitamin D3 5000IU', 'Omega-3 Fish Oil']
    },
    {
      id: 'ORD-78944',
      date: '2024-01-10',
      items: 2,
      total: 150,
      status: 'shipped',
      tracking: 'TRK-789456124',
      itemsList: ['Vitamin C 1000mg', 'Zinc Supplements']
    },
    {
      id: 'ORD-78943',
      date: '2025-09-16',
      items: 1,
      total: 300,
      status: 'processing',
      tracking: 'TRK-789456125',
      itemsList: ['Probiotics 50 Billion CFU']
    },
    {
      id: 'ORD-78942',
      date: '2025-09-11',
      items: 4,
      total: 575,
      status: 'delivered',
      tracking: 'TRK-789456126',
      itemsList: ['Melatonin 10mg', 'Magnesium Glycinate', 'Ashwagandha', 'B-Complex']
    },
    {
      id: 'ORD-78941',
      date: '2025-09-01',
      items: 2,
      total: 180,
      status: 'cancelled',
      tracking: 'TRK-789456127',
      itemsList: ['Vitamin B12', 'Iron Supplements']
    }
  ];

  const statusConfig = {
    delivered: { icon: <CheckCircle size={16} />, color: 'bg-green-100 text-green-800', label: 'Delivered' },
    shipped: { icon: <Truck size={16} />, color: 'bg-blue-100 text-blue-800', label: 'Shipped' },
    processing: { icon: <Clock size={16} />, color: 'bg-yellow-100 text-yellow-800', label: 'Processing' },
    cancelled: { icon: <AlertCircle size={16} />, color: 'bg-red-100 text-red-800', label: 'Cancelled' }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleBackToShop = () => navigate('/shop');
  const handleReorder = (orderId) => alert(`Reordering order ${orderId}`);
  const handleViewDetails = (orderId) => navigate(`/orders/${orderId}`);
  const handleDownloadInvoice = (orderId) => alert(`Downloading invoice for ${orderId}`);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToShop}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300"
            >
              <ArrowLeft size={20} />
              <span>Back to Shop</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Package className="text-blue-700" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
                <p className="text-gray-600">Track and manage your supplement orders</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-white px-4 py-3 rounded-lg border border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'processing' || o.status === 'shipped').length}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-sm border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Total Value</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatNumber(orders.reduce((sum, order) => sum + order.total, 0))}
                </p>
              </div>
              <div className="p-3 bg-white/50 rounded-xl">
                <Hash className="text-blue-700" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Delivered</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {orders.filter(o => o.status === 'delivered').length}
                </p>
              </div>
              <div className="p-3 bg-white/50 rounded-xl">
                <CheckCircle className="text-green-700" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-sm border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Total Items</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatNumber(orders.reduce((sum, order) => sum + order.items, 0))}
                </p>
              </div>
              <div className="p-3 bg-white/50 rounded-xl">
                <Package className="text-purple-700" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl shadow-sm border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-700 font-medium">In Transit</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {orders.filter(o => o.status === 'shipped').length}
                </p>
              </div>
              <div className="p-3 bg-white/50 rounded-xl">
                <Truck className="text-amber-700" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by order ID, product name..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl">
                  <Calendar size={18} className="text-gray-500" />
                  <select className="bg-transparent outline-none min-w-[140px]">
                    <option>All Time</option>
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                    <option>Last year</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl">
                  <Filter size={18} className="text-gray-500" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-transparent outline-none min-w-[140px]"
                  >
                    <option value="all">All Orders</option>
                    <option value="delivered">Delivered</option>
                    <option value="shipped">Shipped</option>
                    <option value="processing">Processing</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-5 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2">
                <Download size={16} />
                Export All
              </button>
              <button className="px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2 shadow-sm">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const status = statusConfig[order.status];
            
            return (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6 md:p-8">
                  {/* Order Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <Package className="text-blue-700" size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{order.id}</h3>
                          <span className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 ${status.color}`}>
                            {status.icon}
                            <span>{status.label}</span>
                          </span>
                        </div>
                        <p className="text-gray-600 flex items-center gap-2">
                          <Calendar size={16} />
                          {new Date(order.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-gray-900 mb-1">{formatNumber(order.total)}</p>
                      <p className="text-sm text-gray-600">{order.items} item{order.items > 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3">ORDER ITEMS</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                      {order.itemsList.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Tracking:</span>
                          <code className="px-3 py-1.5 bg-gray-100 rounded-lg font-mono">
                            {order.tracking}
                          </code>
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                          <span className="font-medium">Items:</span>
                          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg font-medium">
                            {order.items}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleDownloadInvoice(order.id)}
                          className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors border border-gray-200"
                        >
                          <FileText size={16} />
                          <span>Invoice</span>
                        </button>
                        <button
                          onClick={() => handleReorder(order.id)}
                          className="flex items-center gap-2 px-4 py-2.5 text-blue-700 hover:text-blue-800 hover:bg-blue-50 rounded-xl transition-colors border border-blue-200"
                        >
                          <Repeat size={16} />
                          <span>Reorder</span>
                        </button>
                        <button
                          onClick={() => handleViewDetails(order.id)}
                          className="flex items-center gap-2 px-5 py-2.5 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
                        >
                          <Eye size={16} />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-20">
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
              <Package className="text-gray-400" size={60} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No orders match your criteria</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Try adjusting your filters or explore our supplement collection to make your first order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setFilter('all')}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
              >
                Clear Filters
              </button>
              <button
                onClick={handleBackToShop}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
              >
                Browse Supplements
              </button>
            </div>
          </div>
        )}

        {/* Information Panel */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <AlertCircle size={20} />
              <span>Order Support</span>
            </h4>
            <ul className="text-blue-800 space-y-2.5">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                <span>Need to return an item? Contact us within 4 days of delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                <span>Track shipments in real-time using your tracking number</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                <span>Bulk orders available for healthcare professionals</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
            <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <CheckCircle size={20} />
              <span>Subscription Benefits</span>
            </h4>
            <ul className="text-green-800 space-y-2.5">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                <span>Save 15% on recurring orders with our subscription service</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                <span>Free shipping on orders above 5000</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                <span>Priority customer support for subscribers</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
              <Truck size={20} />
              <span>Delivery Information</span>
            </h4>
            <ul className="text-purple-800 space-y-2.5">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                <span>Standard delivery: 3-5 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                <span>Express delivery available at checkout</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                <span>Live tracking updates via email and SMS</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;