const mongoose = require('mongoose');

const typeEventSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('TypeEvent', typeEventSchema);