import React from 'react';
import OrderForm from '../components/OrderForm';

const BulkOrderPage = () => {
    return (
        <div className="min-h-screen pt-20 px-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-900/40 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-900/40 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto">
                {/* Intro Text Content */}
                <div className="text-center max-w-4xl mx-auto mb-16 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        Place Bulk Fabric Orders Directly <br /> from the Manufacturer
                    </h1>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        We accept bulk orders for a wide range of powerloom fabrics suitable for retail, wholesale,
                        and industrial textile requirements. All fabrics are manufactured under controlled quality
                        standards with customization options based on client needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <OrderForm />

                    {/* Visual/Process Section (Right side in reading order, but maybe below/around based on layout) */}
                    {/* Wait, the image shows "How Bulk Orders Work" at the bottom or separate. 
                        I will add it as a section below or side. The prompt said "not use the UI", 
                        so I'll just add the content cleanly.
                    */}
                </div>

                {/* How Bulk Orders Work Section */}
                <div className="mt-20 mb-20 text-center">
                    <h2 className="text-3xl font-bold mb-10">How Bulk Orders Work</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="glass-card p-6">
                            <div className="text-4xl mb-4">📝</div>
                            <h3 className="text-xl font-bold">1. Submit Order Requirements</h3>
                        </div>
                        <div className="glass-card p-6">
                            <div className="text-4xl mb-4">🧠</div>
                            <h3 className="text-xl font-bold">2. Owner Reviews Order</h3>
                        </div>
                        <div className="glass-card p-6">
                            <div className="text-4xl mb-4">📦</div>
                            <h3 className="text-xl font-bold">3. Confirmation & Manufacturing and Dispatch</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BulkOrderPage;
