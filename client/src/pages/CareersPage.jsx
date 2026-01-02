import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Send, CheckCircle } from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const jobs = [
    {
        id: 1,
        title: "Textile Engineer",
        type: "Full-time",
        location: "Salem, TN",
        description: "Oversee powerloom operations and ensure fabric quality standards."
    },
    {
        id: 2,
        title: "Sales Executive",
        type: "Full-time",
        location: "Remote / Hybrid",
        description: "Manage bulk client relationships and drive B2B sales."
    },
    {
        id: 3,
        title: "Machine Operator",
        type: "Contract",
        location: "Salem, TN",
        description: "Operate and maintain textile machinery."
    }
];

const CareersPage = () => {
    const [selectedJob, setSelectedJob] = useState(jobs[0].title);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        position: jobs[0].title,
        experience: '',
        resumeLink: ''
    });
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await axios.post('http://localhost:5000/api/recruitment/apply', formData);
            setStatus('success');
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                position: selectedJob,
                experience: '',
                resumeLink: ''
            });
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0c29] text-white font-sans">
            <Navbar />

            <div className="pt-32 pb-20 px-6 container mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                        Join Our Team
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Build the future of textile manufacturing with Sri Krishna Textiles.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Job Listings */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Briefcase className="text-blue-400" /> Open Positions
                        </h2>
                        {jobs.map(job => (
                            <motion.div
                                key={job.id}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => {
                                    setSelectedJob(job.title);
                                    setFormData({ ...formData, position: job.title });
                                }}
                                className={`p-6 rounded-xl border cursor-pointer transition-all ${selectedJob === job.title ? 'bg-white/10 border-blue-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold">{job.title}</h3>
                                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded">{job.type}</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-2">{job.location}</p>
                                <p className="text-gray-300 text-sm">{job.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Application Form */}
                    <div className="glass-card p-8 md:p-10 sticky top-32 h-fit">
                        <AnimatePresence mode='wait'>
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-10"
                                >
                                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                                    <h2 className="text-2xl font-bold mb-2">Application Sent!</h2>
                                    <p className="text-gray-400">We'll be in touch soon.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="mt-6 text-blue-400 hover:text-blue-300 underline"
                                    >
                                        Apply for another role
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <h2 className="text-2xl font-bold mb-6">Apply for <span className="text-blue-400">{selectedJob}</span></h2>

                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-blue-500 outline-none"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-blue-500 outline-none"
                                        />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="experience"
                                        placeholder="Experience (e.g. 2 years)"
                                        required
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-blue-500 outline-none"
                                    />
                                    <input
                                        type="url"
                                        name="resumeLink"
                                        placeholder="Resume / Portfolio Link (Google Drive/LinkedIn)"
                                        value={formData.resumeLink}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-blue-500 outline-none"
                                    />

                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg font-bold hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {status === 'submitting' ? 'Sending...' : <>Submit Application <Send className="w-4 h-4" /></>}
                                    </button>
                                    {status === 'error' && <p className="text-red-400 text-center text-sm">Failed to submit. Please try again.</p>}
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CareersPage;
