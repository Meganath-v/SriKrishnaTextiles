import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="footer" className="bg-black/40 pt-20 pb-10 relative mt-20">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Contact Info */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        Get in Touch
                    </h2>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/5 rounded-lg text-purple-400">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold">Phone</p>
                                <p className="text-gray-400 font-mono">+91 95678 95443</p>
                                <p className="text-gray-400 font-mono">+91 95964 57341</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/5 rounded-lg text-purple-400">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold">Email</p>
                                <p className="text-gray-400">srikrishnatextiles@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/5 rounded-lg text-purple-400">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold">Address</p>
                                <p className="text-gray-400 max-w-xs">
                                    32/A Sankiri unjakorai, <br />
                                    salem Tamil nadu India
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="glass-card p-2 h-[400px] overflow-hidden relative">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125027.70119277646!2d78.07062485521404!3d11.65390979509893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1ccf52cba0b%3A0xee9989007068ca06!2sSalem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709234567890!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>

                    <div className="absolute top-4 right-4 glass-card p-4 text-xs max-w-[150px] text-right">
                        <span className="text-green-400 font-bold block mb-1">● Open Now</span>
                        Mon - Sat: 9am - 8pm
                    </div>
                </div>

            </div>

            <div className="text-center mt-20 text-gray-600 text-sm">
                © 2024 Sri Krishna Textiles. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
