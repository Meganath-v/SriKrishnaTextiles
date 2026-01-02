import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Send } from 'lucide-react';
import axios from 'axios';

const OrderForm = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        phoneNumber: '',
        fabricType: 'Rayon',
        quantity: '',
        contactPerson: '',
        email: '',
        specialInstructions: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await axios.post('http://localhost:5000/api/orders', formData);
            setStatus('success');
            // Reset after 3 seconds or keep success message
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-8 relative">
            <AnimatePresence>
                {status === 'success' ? (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="glass-card p-12 text-center flex flex-col items-center justify-center min-h-[400px]"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                            <CheckCircle className="w-24 h-24 text-green-400 mb-6" />
                        </motion.div>
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-500 mb-4">
                            Order Received!
                        </h2>
                        <p className="text-gray-300">
                            We will contact you shortly to confirm details.
                        </p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-8 px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
                        >
                            Place Another Order
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        onSubmit={handleSubmit}
                        className="glass-card p-8 md:p-10 space-y-6"
                    >
                        <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
                            Bulk Order Request
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Company/Producer Name *</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                    placeholder="Company/Producer Name"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                    placeholder="+91"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Fabric Type *</label>
                                <input
                                    type="text"
                                    name="fabricType"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                    placeholder="eg. Rayon"
                                    value={formData.fabricType}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Quantity (Meters/Rolls) *</label>
                                <input
                                    type="text"
                                    name="quantity"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                                    placeholder="500 meters"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Contact Person Name *</label>
                                <input
                                    type="text"
                                    name="contactPerson"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                                    placeholder="contact person name"
                                    value={formData.contactPerson}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Special Instructions</label>
                            <textarea
                                name="specialInstructions"
                                rows="3"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                                placeholder="Custom patterns, GSM requirement,color preference."
                                value={formData.specialInstructions}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {status === 'submitting' ? 'Processing...' : (
                                <>
                                    Submit Order Request <Send className="w-5 h-5" />
                                </>
                            )}
                        </button>

                        {status === 'error' && (
                            <p className="text-red-400 text-center text-sm">Failed to submit order. Please try again.</p>
                        )}
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OrderForm;
