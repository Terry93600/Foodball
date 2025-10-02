const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);