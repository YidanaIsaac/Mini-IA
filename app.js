const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientId: { type: String, required: true, unique: true },
    surname: String,
    otherNames: String,
    gender: String,
    phoneNumber: String,
    residentialAddress: String,
    emergencyContact: {
        name: String,
        contact: String,
        relationship: String
    }
});

module.exports = mongoose.model('Patient', patientSchema);