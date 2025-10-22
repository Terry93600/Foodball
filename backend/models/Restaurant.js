const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, 'Le nom du restaurant est obligatoire'],
        trim: true,
        minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
        maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
    },
    description: {
        type: String,
        required: [true, 'La description est obligatoire'],
        trim: true,
        minlength: [10, 'La description doit contenir au moins 10 caractères'],
        maxlength: [1000, 'La description ne peut pas dépasser 1000 caractères']
    },
    localisation: {
        type: String,
        required: [true, 'La localisation est obligatoire'],
        trim: true
    },
    codePostal: {
        type: String,
        required: [true, 'Le code postal est obligatoire'],
        trim: true,
        match: [/^\d{5}$/, 'Le code postal doit contenir 5 chiffres']
    },
    ville: {
        type: String,
        required: [true, 'La ville est obligatoire'],
        trim: true,
        minlength: [2, 'La ville doit contenir au moins 2 caractères']
    },
    telephone: {
        type: String,
        required: [true, 'Le numéro de téléphone est obligatoire'],
        trim: true,
        match: [/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Format de téléphone invalide']
    },
    email: {
        type: String,
        required: [true, 'L\'email du restaurant est obligatoire'],
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Format d\'email invalide']
    },
    capacite: {
        type: Number,
        required: [true, 'La capacité est obligatoire'],
        min: [1, 'La capacité doit être d\'au moins 1 personne'],
        max: [1000, 'La capacité ne peut pas dépasser 1000 personnes']
    },
    prixMoyen: {
        type: Number,
        required: [true, 'Le prix moyen est obligatoire'],
        min: [1, 'Le prix moyen doit être d\'au moins 1€'],
        max: [500, 'Le prix moyen ne peut pas dépasser 500€']
    },
    menu: {
        type: String,
        required: false,
        trim: true,
        maxlength: [5000, 'Le menu ne peut pas dépasser 5000 caractères']
    },
    utilisateur_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: [true, 'L\'utilisateur est obligatoire']
    },
    team1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: false
    },
    team2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: false
    },
    typeEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TypeEvent',
        required: false
    }
}, {
    timestamps: true
});

// Index pour améliorer les performances
restaurantSchema.index({ utilisateur_id: 1 });
restaurantSchema.index({ ville: 1 });
restaurantSchema.index({ prixMoyen: 1 });

module.exports = mongoose.model('Restaurant', restaurantSchema);