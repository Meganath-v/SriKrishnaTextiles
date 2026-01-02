import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Users, Award } from 'lucide-react';

const stats = [
    {
        icon: <Award className="w-8 h-8 text-yellow-400" />,
        label: "20+ Years",
        sub: "Manufacturing"
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-green-400" />,
        label: "Premium",
        sub: "Yarn Quality"
    },
    {
        icon: <Truck className="w-8 h-8 text-blue-400" />,
        label: "Bulk Order",
        sub: "Fulfillment"
    },
    {
        icon: <Users className="w-8 h-8 text-purple-400" />,
        label: "Trusted by",
        sub: "Traders & Mills"
    },
];

const TrustBar = () => {
    return (
        <section className="py-10 px-6 relative z-10">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                            className="glass-card p-6 flex flex-col items-center text-center group cursor-default transition-colors hover:border-purple-500/50"
                        >
                            <div className="mb-3 p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                {stat.icon}
                            </div>
                            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                                {stat.label}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">{stat.sub}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustBar;
