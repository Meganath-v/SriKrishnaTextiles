const mongoose = require('mongoose');

const RecruitmentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    experience: { type: String, required: true },
    resumeLink: { type: String }, // User can paste a Google Drive link or similar
    status: {
        type: String,
        enum: ['Applied', 'Interviewing', 'Hired', 'Rejected'],
        default: 'Applied'
    }
}, { timestamps: true });

module.exports = mongoose.model('Recruitment', RecruitmentSchema);
