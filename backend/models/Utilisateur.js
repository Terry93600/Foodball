// const mongoose = require('mongoose');

// const utilisateurSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Role',
//         required: true
//     }
// }, {
//     timestamps: true
// });

// module.exports = mongoose.model('Utilisateur', utilisateurSchema);

const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'L\'email est obligatoire'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Format d\'email invalide'
        ]
    },
    nom: {
        type: String,
        required: [true, 'Le nom est obligatoire'],
        trim: true,
        minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
        maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères'],
        match: [/^[a-zA-ZÀ-ÿ\s-']+$/, 'Le nom ne peut contenir que des lettres']
    },
    prenom: {
        type: String,
        required: [true, 'Le prénom est obligatoire'],
        trim: true,
        minlength: [2, 'Le prénom doit contenir au moins 2 caractères'],
        maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères'],
        match: [/^[a-zA-ZÀ-ÿ\s-']+$/, 'Le prénom ne peut contenir que des lettres']
    },
    telephone: {
        type: String,
        required: [true, 'Le numéro de téléphone est obligatoire'],
        trim: true,
        match: [
            /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
            'Format de téléphone français invalide (ex: 06 12 34 56 78)'
        ]
    },
    password: {
        type: String,
        required: [true, 'Le mot de passe est obligatoire'],
        minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères'],
        validate: {
            validator: function(password) {
                // Au moins une majuscule, une minuscule, un chiffre
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
            },
            message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre'
        }
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, 'Le rôle est obligatoire']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Index pour optimiser les recherches
utilisateurSchema.index({ email: 1 });
utilisateurSchema.index({ telephone: 1 });

// Méthode pour masquer le mot de passe dans les réponses JSON
utilisateurSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    return user;
};

// Méthode pour formater le téléphone
utilisateurSchema.methods.formatTelephone = function() {
    return this.telephone.replace(/(\d{2})(?=\d)/g, '$1 ');
};

// Validation avant sauvegarde
utilisateurSchema.pre('save', function(next) {
    // Nettoyer le téléphone (enlever espaces, points, tirets)
    if (this.telephone) {
        this.telephone = this.telephone.replace(/[\s.-]/g, '');
    }
    next();
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);