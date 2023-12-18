const express = require('express');
const router = express.Router();
const Encounter = require('../models/Encounter');

// Start a new encounter
router.post('/', async (req, res) => {
    try {
        const encounter = new Encounter(req.body);
        await encounter.save();
        res.status(201).send(encounter);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Submit vitals for a patient
router.post('/:patientId/vitals', async (req, res) => {
    try {
        const encounter = await Encounter.findOne({ patientId: req.params.patientId });
        if (!encounter) {
            return res.status(404).send('Encounter not found for the patient');
        }

        encounter.vitals = req.body;
        await encounter.save();
        res.send(encounter);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
const mongoose = require('mongoose');

const encounterSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    date: Date,
    time: String,
    typeOfEncounter: String,
    vitals: {
        bloodPressure: String,
        temperature: Number,
        pulse: Number,
        sp02: Number
    }
});

module.exports = mongoose.model('Encounter', encounterSchema);