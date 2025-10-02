const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    team1_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    team2_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    typeEvent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TypeEvent',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);