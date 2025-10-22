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

    selectOne: async (req, res) => {
        try {
            const { id } = req.params;
            const restaurant = await Restaurant.findById(id)
                .populate('utilisateur_id', 'name email');
            
            res.json({ data: restaurant });
        } catch (error) {
            console.error('Erreur selectOne restaurant:', error);
            res.json({ state: "error" });
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

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, req.body, { new: true });
            
            res.json({ data: updatedRestaurant });
        } catch (error) {
            console.error('Erreur update restaurant:', error);
            res.json({ state: "error" });
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