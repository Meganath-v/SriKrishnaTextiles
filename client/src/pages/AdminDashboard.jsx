import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Package, Check, Upload, FileSpreadsheet, LayoutDashboard, Database, Users } from 'lucide-react';

const AdminLogin = ({ onLogin }) => {
    const [creds, setCreds] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', creds);
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', res.data.user.role);
                onLogin(res.data.user);
            }
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f0c29]">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 w-full max-w-md"
            >
                <div className="flex justify-center mb-6">
                    <div className="p-3 bg-purple-500/20 rounded-full">
                        <Lock className="w-8 h-8 text-purple-300" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">Admin Access</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-2"
                        value={creds.username}
                        onChange={e => setCreds({ ...creds, username: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-2"
                        value={creds.password}
                        onChange={e => setCreds({ ...creds, password: e.target.value })}
                    />
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded font-semibold transition-colors">
                        Login
                    </button>
                    <div className="text-center text-xs text-gray-500 mt-2">
                        (Demo: admin / admin123)
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('orders');

    // Data
    const [orders, setOrders] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [applications, setApplications] = useState([]);

    // UI States
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Upload State
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token && role === 'admin') {
            setUser({ role });
            fetchData();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchData = async () => {
        try {
            const orderRes = await axios.get('http://localhost:5000/api/orders');
            setOrders(orderRes.data);

            const invRes = await axios.get('http://localhost:5000/api/inventory');
            setInventory(invRes.data);

            const appRes = await axios.get('http://localhost:5000/api/recruitment');
            setApplications(appRes.data);

            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:5000/api/inventory/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMsg(`Success! Synced ${res.data.count || 'all'} items.`);
            setUploading(false);
            fetchData(); // Refresh data
        } catch (err) {
            setMsg('Failed to upload.');
            setUploading(false);
        }
    };

    if (!user && !loading) {
        return <AdminLogin onLogin={(u) => { setUser(u); fetchData(); }} />;
    }

    if (loading) return <div className="text-center mt-20 text-white">Loading...</div>;

    return (
        <div className="min-h-screen pt-20 px-6 bg-[#0f0c29]">
            <div className="container mx-auto relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <button
                        onClick={() => { localStorage.clear(); setUser(null); }}
                        className="text-sm text-red-400 hover:text-red-300"
                    >
                        Logout
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'orders' ? 'bg-purple-600' : 'glass-card hover:bg-white/10'}`}
                    >
                        <LayoutDashboard className="w-4 h-4" /> Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('inventory')}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'inventory' ? 'bg-purple-600' : 'glass-card hover:bg-white/10'}`}
                    >
                        <Database className="w-4 h-4" /> Inventory Monitor
                    </button>
                    <button
                        onClick={() => setActiveTab('recruitment')}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === 'recruitment' ? 'bg-purple-600' : 'glass-card hover:bg-white/10'}`}
                    >
                        <Users className="w-4 h-4" /> Recruitment
                    </button>
                </div>

                <div className="glass-card overflow-hidden p-6 min-h-[500px]">
                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div className="overflow-x-auto">
                            <h2 className="text-xl font-semibold mb-4">Bulk Orders</h2>
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-white/5 border-b border-white/10">
                                    <tr>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Company</th>
                                        <th className="p-4">Fabric</th>
                                        <th className="p-4">Quantity</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {orders.map(order => (
                                        <tr key={order._id} className="hover:bg-white/5">
                                            <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="p-4 font-medium">{order.companyName}</td>
                                            <td className="p-4">{order.fabricType}</td>
                                            <td className="p-4">{order.quantity}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs ${order.status === 'Shipped' ? 'bg-green-500/20 text-green-300' :
                                                    order.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-300' :
                                                        'bg-blue-500/20 text-blue-300'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {orders.length === 0 && <div className="p-8 text-center text-gray-400">No orders found.</div>}
                        </div>
                    )}

                    {/* Inventory Tab */}
                    {activeTab === 'inventory' && (
                        <div>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold">Inventory Monitor</h2>
                                    <p className="text-sm text-gray-400">Sync database with Excel sheet (.xlsx)</p>
                                </div>
                                <form onSubmit={handleFileUpload} className="flex gap-2 items-center">
                                    <input
                                        type="file"
                                        accept=".xlsx, .xls"
                                        onChange={e => setFile(e.target.files[0])}
                                        className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!file || uploading}
                                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg disabled:opacity-50"
                                    >
                                        <Upload className="w-4 h-4" /> {uploading ? 'Syncing...' : 'Sync Excel'}
                                    </button>
                                </form>
                            </div>
                            {msg && <p className={`mb-4 ${msg.includes('Success') ? 'text-green-400' : 'text-red-400'}`}>{msg}</p>}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {inventory.map((item, idx) => (
                                    <div key={idx} className="bg-white/5 p-4 rounded-lg border border-white/10 flex justify-between items-center">
                                        <div>
                                            <h3 className="font-semibold text-lg">{item.productName}</h3>
                                            <p className="text-xs text-gray-500">Last Updated: {new Date(item.lastUpdated).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-2xl font-bold text-purple-300">
                                            {item.stockLevel}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {inventory.length === 0 && (
                                <div className="p-8 text-center text-gray-400 border border-dashed border-white/20 rounded-lg">
                                    <FileSpreadsheet className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    No inventory data synced yet. Upload an Excel file.
                                </div>
                            )}
                        </div>
                    )}

                    {/* Recruitment Tab */}
                    {activeTab === 'recruitment' && (
                        <div className="overflow-x-auto">
                            <h2 className="text-xl font-semibold mb-4">Job Applications</h2>
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-white/5 border-b border-white/10">
                                    <tr>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Name</th>
                                        <th className="p-4">Position</th>
                                        <th className="p-4">Experience</th>
                                        <th className="p-4">Contact</th>
                                        <th className="p-4">Resume</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {applications.map(app => (
                                        <tr key={app._id} className="hover:bg-white/5">
                                            <td className="p-4">{new Date(app.createdAt).toLocaleDateString()}</td>
                                            <td className="p-4 font-medium">{app.fullName}</td>
                                            <td className="p-4">{app.position}</td>
                                            <td className="p-4">{app.experience}</td>
                                            <td className="p-4">
                                                <div className="text-sm">{app.email}</div>
                                                <div className="text-xs text-gray-400">{app.phone}</div>
                                            </td>
                                            <td className="p-4">
                                                {app.resumeLink ? (
                                                    <a href={app.resumeLink} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 underline">Link</a>
                                                ) : <span className="text-gray-500">-</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {applications.length === 0 && <div className="p-8 text-center text-gray-400">No applications received.</div>}
                        </div>
                    )}
                </div>
            </div>

            {/* Order Details Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-[#1a1b3a] border border-white/20 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                            </button>

                            <h2 className="text-2xl font-bold mb-6 text-purple-300">Order Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Company Name</label>
                                    <p className="text-lg font-medium">{selectedOrder.companyName}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Status</label>
                                    <p className={`text-lg font-medium ${selectedOrder.status === 'Shipped' ? 'text-green-400' : 'text-yellow-400'}`}>
                                        {selectedOrder.status}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Contact Person</label>
                                    <p className="text-lg">{selectedOrder.contactPerson}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Phone</label>
                                    <p className="text-lg">{selectedOrder.phoneNumber}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Email</label>
                                    <p className="text-lg">{selectedOrder.email}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Date</label>
                                    <p className="text-lg">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="bg-white/5 p-4 rounded-lg mb-6">
                                <h3 className="font-bold mb-2 text-white">Order Items</h3>
                                <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                                    <span>Fabric Type:</span>
                                    <span className="font-mono text-purple-300">{selectedOrder.fabricType}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Quantity:</span>
                                    <span className="font-mono text-emerald-300">{selectedOrder.quantity}</span>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 uppercase">Special Instructions</label>
                                <p className="p-4 bg-black/20 rounded-lg text-gray-300 mt-1">
                                    {selectedOrder.specialInstructions || "None"}
                                </p>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
