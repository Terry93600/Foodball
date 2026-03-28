const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    utilisateur_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    date: {
        type: Date,
        required: [true, 'La date est obligatoire']
    },
    heure: {
        type: String,
        required: [true, "L'heure est obligatoire"],
        match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format heure invalide (HH:MM)']
    },
    nombrePersonnes: {
        type: Number,
        required: [true, 'Le nombre de personnes est obligatoire'],
        min: [1, 'Minimum 1 personne'],
        max: [20, 'Maximum 20 personnes']
    },
    statut: {
        type: String,
        enum: ['confirmée', 'annulée'],
        default: 'confirmée'
    }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);