const Utilisateur = require('../models/Utilisateur');

const favoriController = {

    // Ajouter / Retirer un favori (toggle)
    toggle: async (req, res) => {
        try {
            const { userId, restaurantId } = req.params;
            const user = await Utilisateur.findById(userId);
            if (!user) return res.status(404).json({ state: 'error', message: 'Utilisateur non trouvé' });

            const index = user.favoris.indexOf(restaurantId);
            if (index === -1) {
                user.favoris.push(restaurantId); // ➕ Ajouter
            } else {
                user.favoris.splice(index, 1);   // ➖ Retirer
            }

            await user.save({ validateBeforeSave: false });
            res.json({ state: 'success', favoris: user.favoris });

        } catch (error) {
            res.status(500).json({ state: 'error', message: error.message });
        }
    },

    // Récupérer tous les favoris d'un client
    getByUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await Utilisateur.findById(userId).populate('favoris');
            if (!user) return res.status(404).json({ state: 'error', message: 'Utilisateur non trouvé' });

            res.json({ state: 'success', data: user.favoris });

        } catch (error) {
            res.status(500).json({ state: 'error', message: error.message });
        }
    }
};

module.exports = favoriController;