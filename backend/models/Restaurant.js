// const mongoose = require('mongoose');

// const restaurantSchema = new mongoose.Schema({
//     nom: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     localisation: {
//         type: String,
//         required: true
//     },
//     menu: {
//         type: String,
//         required: true
//     },
//     utilisateur_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Utilisateur',
//         required: true
//     },
//     events: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Event'
//     }]
// }, {
//     timestamps: true
// });

// module.exports = mongoose.model('Restaurant', restaurantSchema);

const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    localisation: {
        type: String,
        required: true
    },
    menu: {
        type: String,
        required: false
    },
    utilisateur_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
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

module.exports = mongoose.model('Restaurant', restaurantSchema);