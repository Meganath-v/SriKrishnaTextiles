import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#0f0c29]/70 border-b border-white/10">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Sri Krishna
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                    <a href="/" className="hover:text-white transition-colors">Home</a>
                    <a href="/#fabrics" className="hover:text-white transition-colors">Fabrics</a>
                    <a href="/careers" className="hover:text-white transition-colors">Careers</a>
                    <a href="/#footer" className="hover:text-white transition-colors">Contact</a>
                </div>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <a href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Log in
                    </a>
                    <a href="/bulk-order" className="text-sm font-medium bg-white text-black px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors">
                        Start Order
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-full left-0 w-full bg-[#0f0c29] border-b border-white/10 p-6 flex flex-col gap-4"
                >
                    <a href="#fabrics" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">Fabrics</a>
                    <a href="#" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">Manufacturing</a>
                    <a href="/login" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">Log in</a>
                    <a href="/bulk-order" onClick={() => setIsOpen(false)} className="bg-white text-black text-center py-2 rounded-lg font-medium">Start Order</a>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
