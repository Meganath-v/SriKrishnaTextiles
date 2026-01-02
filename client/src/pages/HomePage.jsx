import React from 'react';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import FabricGrid from '../components/FabricGrid';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div className="relative overflow-hidden w-full font-sans">
            <Navbar />
            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/40 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob"></div>
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/40 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-blue-900/40 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10">
                <Hero />
                <TrustBar />
                <FabricGrid />
                <Footer />
            </div>
        </div>
    );
};

export default HomePage;
