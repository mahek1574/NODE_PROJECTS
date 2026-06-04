const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    timings: {
        type: String,
        required: true
    },
    availableDays: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
