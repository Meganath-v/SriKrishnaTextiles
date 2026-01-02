import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fabrics = [
    { name: "Kerala Saree", desc: "(gold,silver border) - 4,6,8 inches", color: "from-yellow-400 to-yellow-600", category: "sarees" },
    { name: "Dhothi", desc: "(colored borders)", color: "from-blue-400 to-indigo-600", category: "traditional" },
    { name: "Government Sarees And Uniforms", desc: "Bulk Production", color: "from-green-400 to-emerald-600", category: "sarees" },
    { name: "Rayon", desc: "Soft & Durable", color: "from-pink-400 to-rose-600", category: "fabrics" },
    { name: "Tissue Saree", desc: "Premium Weave", color: "from-purple-400 to-violet-600", category: "sarees" },
    { name: "Polyester Fabrics", desc: "Versatile Usage", color: "from-cyan-400 to-teal-600", category: "fabrics" },
];

const categories = ["all", "sarees", "fabrics", "traditional"];

const FabricGrid = () => {
    const [filter, setFilter] = useState('all');

    const filteredFabrics = filter === 'all'
        ? fabrics
        : fabrics.filter(item => item.category === filter);

    return (
        <section id="fabrics" className="py-20 px-6">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-4xl font-bold mb-4">Our Masterpieces</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        From traditional Kerala Weaves to modern Rayon textures, we manufacture fabrics that define industry standards.
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <div className="flex justify-center flex-wrap gap-4 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full capitalize text-sm font-medium transition-all ${filter === cat
                                ? 'bg-white text-black shadow-lg shadow-white/20'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredFabrics.map((item) => (
                            <motion.div
                                key={item.name}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ y: -10 }}
                                className="group glass-card overflow-hidden relative"
                            >
                                {/* Abstract Visual Placeholder */}
                                <div className={`h-48 w-full bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-30 transition-opacity`}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-4xl opacity-50 font-black tracking-widest text-white/20 select-none">
                                            {item.name.split(' ')[0]}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 relative z-10">
                                    <h3 className="text-2xl font-semibold mb-2">{item.name}</h3>
                                    <p className="text-sm text-gray-400">{item.desc}</p>

                                    <div className="mt-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                                        <span className="text-xs font-mono text-purple-300">IN STOCK</span>
                                        <button className="text-sm border border-purple-500/50 bg-purple-500/10 px-4 py-2 rounded hover:bg-purple-500 hover:text-white transition-all">
                                            Details
                                        </button>
                                    </div>
                                </div>

                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default FabricGrid;
