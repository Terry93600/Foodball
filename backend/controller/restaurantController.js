const Restaurant = require("../models/Restaurant");

const restaurantController = {
    // selectAll: async (req, res) => {
    //     try {
    //         const restaurants = await Restaurant.find()
    //             .populate('utilisateur_id', 'name email');
            
    //         res.json({ data: restaurants });
    //     } catch (error) {
    //         console.error('Erreur selectAll restaurants:', error);
    //         res.json({ state: "error" });
    //     }
    // },

    selectAll: async (req, res) => {
    try {
        const restaurants = await Restaurant.find()
            .populate('utilisateur_id', 'name email')
            .populate('team1', 'nom')           // 👈 Cette ligne
            .populate('team2', 'nom')           // 👈 Cette ligne  
            .populate('typeEvent', 'nom');      // 👈 Cette ligne
        
        res.json({ data: restaurants });
    } catch (error) {
        console.error('Erreur selectAll restaurants:', error);
        res.json({ state: "error" });
    }
},

    // selectOne: async (req, res) => {
    //     try {
    //         const { id } = req.params;
    //         const restaurant = await Restaurant.findById(id)
    //             .populate('utilisateur_id', 'name email');
            
    //         res.json({ data: restaurant });
    //     } catch (error) {
    //         console.error('Erreur selectOne restaurant:', error);
    //         res.json({ state: "error" });
    //     }
    // },

    selectOne: async (req, res) => {
    try {
        const { id } = req.params;
        console.log('🔍 Recherche restaurant ID:', id);
        
        const restaurant = await Restaurant.findById(id)
            .populate('team1')      // 👈 Populate team1
            .populate('team2')      // 👈 Populate team2
            .populate('typeEvent')  // 👈 Populate typeEvent
            .populate('utilisateur_id');
        
        console.log('🏪 Restaurant trouvé:', restaurant);
        console.log('🔍 Team1 après populate:', restaurant?.team1);
        console.log('🔍 Team2 après populate:', restaurant?.team2);
        console.log('🔍 TypeEvent après populate:', restaurant?.typeEvent);
        
        if (!restaurant) {
            return res.status(404).json({
                state: "error",
                message: "Restaurant non trouvé",
                data: null
            });
        }
        
        res.json({
            state: "success",
            data: restaurant
        });
    } catch (error) {
        console.error('❌ Erreur:', error);
        res.status(500).json({
            state: "error",
            message: error.message,
            data: null
        });
    }
},

    create: async (req, res) => {
        try {
            const newRestaurant = new Restaurant(req.body);
            const savedRestaurant = await newRestaurant.save();
            
            res.json({ data: savedRestaurant });
        } catch (error) {
            console.error('Erreur create restaurant:', error);
            res.json({ state: "error" });
        }
    },

    // update: async (req, res) => {
    //     try {
    //         const { id } = req.params;
    //         const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, req.body, { new: true });
            
    //         res.json({ data: updatedRestaurant });
    //     } catch (error) {
    //         console.error('Erreur update restaurant:', error);
    //         res.json({ state: "error" });
    //     }
    // },

    update: async (req, res) => {
    try {
        const { id } = req.params;
        console.log('🔄 Tentative de mise à jour du restaurant:', id);
        console.log('👤 Utilisateur:', req.user);

        // 🆕 Vérifier si l'utilisateur est propriétaire (si pas admin)
        if (req.isOwnerCheck) {
            const restaurant = await Restaurant.findById(id);
            
            if (!restaurant) {
                console.log('❌ Restaurant non trouvé');
                return res.status(404).json({ 
                    state: 'error', 
                    message: 'Restaurant non trouvé' 
                });
            }

            // Vérifier que l'utilisateur est bien le propriétaire
            if (restaurant.utilisateur_id.toString() !== req.user.utilisateur_id) {
                console.log('🚫 Accès refusé: utilisateur non propriétaire');
                console.log('Restaurant owner:', restaurant.utilisateur_id);
                console.log('Current user:', req.user.utilisateur_id);
                return res.status(403).json({ 
                    state: 'error', 
                    message: 'Vous ne pouvez modifier que votre propre restaurant' 
                });
            }

            console.log('✅ Propriétaire vérifié');
        }

        // Mise à jour du restaurant
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true }
        ).populate('utilisateur_id');

        console.log('✅ Restaurant mis à jour:', updatedRestaurant);

        res.json({ 
            state: 'success',
            data: updatedRestaurant 
        });

    } catch (error) {
        console.error('💥 Erreur update restaurant:', error);
        res.status(500).json({ 
            state: 'error', 
            message: 'Erreur lors de la mise à jour' 
        });
    }
},

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
            res.json({ data: deletedRestaurant });
        } catch (error) {
            console.error('Erreur delete restaurant:', error);
            res.json({ state: "error" });
        }
    }
};

module.exports = restaurantController;