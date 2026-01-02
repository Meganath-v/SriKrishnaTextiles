import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Layers, Settings, Truck } from 'lucide-react';

const Hero = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center pt-32 relative overflow-hidden">

            {/* Centered Text Content */}
            <div className="container mx-auto px-6 text-center relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 font-medium mb-6">
                        ✨ Premium Powerloom Manufacturing
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 tracking-tight">
                        Premium Powerloom Fabrics <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                            Manufactured with Precision & Trust
                        </span>
                    </h1>

                    <div className="text-left text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto space-y-2">
                        <p>• High-quality powerloom fabrics</p>
                        <p>• Transparent stock & bulk supply</p>
                        <p>• Direct-to-customer manufacturing</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-[#6d28d9] hover:bg-[#5b21b6] text-white rounded-lg font-medium text-lg transition-colors shadow-[0_0_20px_rgba(109,40,217,0.5)]"
                            onClick={() => document.getElementById('fabrics').scrollIntoView({ behavior: 'smooth' })}
                        >
                            Explore Our Manufacturing
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-lg font-medium text-lg transition-colors flex items-center gap-2"
                        >
                            <Play className="w-4 h-4 fill-current" /> Watch Process
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Hero Visual / Banner (Matches the bottom graphic in reference) */}
            <div className="mt-20 relative w-full h-[400px] md:h-[500px]">
                {/* Abstract Background Banner */}
                <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-r from-[#4c1d95] via-[#ec4899] to-[#f59e0b] transform -skew-y-3 origin-bottom-right rounded-t-[50px] opacity-90 blur-sm"></div>
                <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-r from-[#312e81] via-[#6d28d9] to-[#ec4899] transform skew-y-2 origin-bottom-left rounded-t-[50px] mix-blend-multiply opacity-80"></div>

                {/* Floating Cards (Wollo style) */}
                <div className="absolute inset-0 flex items-center justify-center gap-8 perspective-1000 overflow-hidden px-4">
                    {/* Floating Card 1 */}
                    <motion.div
                        animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="w-64 h-80 glass-card bg-black/20 p-6 backdrop-blur-xl border border-white/20 rounded-3xl transform rotate-[-10deg] shadow-2xl relative z-10 hidden md:block"
                    >
                        <div className="w-12 h-12 bg-purple-500 rounded-full mb-4 flex items-center justify-center text-white"><Layers /></div>
                        <div className="h-4 w-3/4 bg-white/20 rounded mb-2"></div>
                        <div className="h-4 w-1/2 bg-white/20 rounded"></div>
                        <div className="absolute bottom-6 right-6 text-6xl font-black text-white/10">01</div>
                    </motion.div>

                    {/* Center Hero Card */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-80 md:w-96 h-96 glass-card bg-gradient-to-br from-white/10 to-transparent p-8 backdrop-blur-2xl border border-white/30 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 flex flex-col items-center justify-center text-center"
                    >
                        <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-pink-500 rounded-full mb-6 flex items-center justify-center shadow-lg">
                            <Settings className="w-12 h-12 text-white spin-slow" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Precision Made</h3>
                        <p className="text-gray-300">120+ Powerlooms synchronized for daily output.</p>
                    </motion.div>

                    {/* Floating Card 3 */}
                    <motion.div
                        animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="w-64 h-80 glass-card bg-black/20 p-6 backdrop-blur-xl border border-white/20 rounded-3xl transform rotate-[10deg] shadow-2xl relative z-10 hidden md:block"
                    >
                        <div className="w-12 h-12 bg-pink-500 rounded-full mb-4 flex items-center justify-center text-white"><Truck /></div>
                        <div className="h-4 w-3/4 bg-white/20 rounded mb-2"></div>
                        <div className="h-4 w-1/2 bg-white/20 rounded"></div>
                        <div className="absolute bottom-6 right-6 text-6xl font-black text-white/10">02</div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
