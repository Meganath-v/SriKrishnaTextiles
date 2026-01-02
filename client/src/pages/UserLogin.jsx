import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserLogin = () => {
    const [creds, setCreds] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', creds);
            if (res.data.token && res.data.user.role === 'customer') {
                localStorage.setItem('user_token', res.data.token);
                setSuccess(true);
            } else {
                setError('Please login as a customer.');
            }
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#0f0c29] text-white flex flex-col items-center justify-center p-6">
                <Navbar />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-10 text-center max-w-md w-full"
                >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <User className="w-10 h-10 text-green-400" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                    <p className="text-gray-400 mb-8">You have successfully logged in to the Client Portal.</p>
                    <a href="/bulk-order" className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-bold transition-all inline-block">
                        Place a Bulk Order
                    </a>
                </motion.div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0c29] flex flex-col">
            <Navbar />

            <div className="flex-grow flex items-center justify-center px-6 pt-20 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 w-full max-w-md relative"
                >
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-blue-500/20 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                            <User className="w-8 h-8 text-blue-300" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center mb-2">Customer Login</h2>
                    <p className="text-center text-gray-400 mb-8 text-sm">Access your order history and profile</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Username</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-blue-500 focus:bg-white/10 outline-none transition-all"
                                value={creds.username}
                                onChange={e => setCreds({ ...creds, username: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-blue-500 focus:bg-white/10 outline-none transition-all"
                                value={creds.password}
                                onChange={e => setCreds({ ...creds, password: e.target.value })}
                            />
                        </div>

                        {error && <p className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded border border-red-500/20">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 py-3 rounded-lg font-bold shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.02]"
                        >
                            Log In
                        </button>



                        <div className="text-center mt-4">
                            <span className="text-xs text-gray-600">(Demo User: customer / customer)</span>
                        </div>
                    </form>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default UserLogin;
