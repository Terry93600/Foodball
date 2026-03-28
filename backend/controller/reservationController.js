const Reservation = require('../models/Reservation');

const reservationController = {

    // Créer une réservation
    create: async (req, res) => {
        try {
            const { utilisateur_id, restaurant_id, date, heure, nombrePersonnes } = req.body;

            const reservation = new Reservation({
                utilisateur_id, restaurant_id, date, heure, nombrePersonnes
            });

            const saved = await reservation.save();
            res.status(201).json({ state: 'success', data: saved });

        } catch (error) {
            if (error.name === 'ValidationError') {
                const errors = Object.values(error.errors).map(e => e.message);
                return res.status(400).json({ state: 'error', errors });
            }
            res.status(500).json({ state: 'error', message: error.message });
        }
    },

    // Historique d'un client (réservations passées)
    getHistoriqueByUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const now = new Date();

            const reservations = await Reservation.find({
                utilisateur_id: userId,
                date: { $lt: now },         // 👈 uniquement passées
                statut: 'confirmée'
            })
            .populate('restaurant_id')
            .sort({ date: -1 });            // plus récente en premier

            res.json({ state: 'success', data: reservations });

        } catch (error) {
            res.status(500).json({ state: 'error', message: error.message });
        }
    },

    // Réservations à venir d'un client
    getAVenirByUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const now = new Date();

            const reservations = await Reservation.find({
                utilisateur_id: userId,
                date: { $gte: now },        // 👈 uniquement futures
                statut: 'confirmée'
            })
            .populate('restaurant_id')
            .sort({ date: 1 });

            res.json({ state: 'success', data: reservations });

        } catch (error) {
            res.status(500).json({ state: 'error', message: error.message });
        }
    },

    // Annuler une réservation
    annuler: async (req, res) => {
        try {
            const { id } = req.params;
            const reservation = await Reservation.findByIdAndUpdate(
                id,
                { statut: 'annulée' },
                { new: true }
            );
            if (!reservation) return res.status(404).json({ state: 'error', message: 'Réservation non trouvée' });

            res.json({ state: 'success', data: reservation });

        } catch (error) {
            res.status(500).json({ state: 'error', message: error.message });
        }
    },

    // Réservations reçues par un restaurateur
    getByRestaurant: async (req, res) => {
        try {
            const { restaurantId } = req.params;

            const reservations = await Reservation.find({
                restaurant_id: restaurantId,
                statut: 'confirmée'
            })
            .populate('utilisateur_id', 'nom prenom email telephone')
            .sort({ date: 1 });

            res.json({ state: 'success', data: reservations });

        } catch (error) {
            res.status(500).json({ state: 'error', message: error.message });
        }
    }
};

module.exports = reservationController;