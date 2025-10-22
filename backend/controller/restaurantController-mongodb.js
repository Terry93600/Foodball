// const Restaurant = require("../models/Restaurant");
// const Event = require("../models/Event");

// const restaurantController = {
//     selectAllFoodball: async (req, res) => {
//         try {
//             const restaurants = await Restaurant.find()
//                 .populate('utilisateur_id', 'email')
//                 .populate({
//                     path: 'events',
//                     populate: [
//                         { path: 'team1_id', select: 'nom' },
//                         { path: 'team2_id', select: 'nom' },
//                         { path: 'typeEvent_id', select: 'nom' }
//                     ]
//                 });

//             // Transformer les données pour correspondre au format attendu
//             const formattedData = [];
//             restaurants.forEach(restaurant => {
//                 restaurant.events.forEach(event => {
//                     formattedData.push({
//                         id: restaurant._id,
//                         nom: restaurant.nom,
//                         description: restaurant.description,
//                         localisation: restaurant.localisation,
//                         menu: restaurant.menu,
//                         utilisateur_id: restaurant.utilisateur_id._id,
//                         email: restaurant.utilisateur_id.email,
//                         team1: event.team1_id.nom,
//                         team2: event.team2_id.nom,
//                         typeEvent: event.typeEvent_id.nom
//                     });
//                 });
//             });

//             res.json({
//                 data: formattedData
//             });
//         } catch (error) {
//             console.log(error);
//             res.json({
//                 state: "error"
//             });
//         }
//     },

//     selectAll: async (req, res) => {
//         try {
//             const restaurants = await Restaurant.find()
//                 .populate('utilisateur_id', 'email');
            
//             const formattedData = restaurants.map(restaurant => ({
//                 id: restaurant._id,
//                 nom: restaurant.nom,
//                 description: restaurant.description,
//                 localisation: restaurant.localisation,
//                 menu: restaurant.menu,
//                 utilisateur_id: restaurant.utilisateur_id._id,
//                 email: restaurant.utilisateur_id.email
//             }));

//             res.json({
//                 data: formattedData
//             });
//         } catch (error) {
//             console.log(error);
//             res.json({
//                 state: "error"
//             });
//         }
//     },

//     selectOne: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const restaurant = await Restaurant.findById(id)
//                 .populate('utilisateur_id')
//                 .populate('events');
//             res.json({
//                 data: restaurant
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({
//                 state: "error"
//             });
//         }
//     },

//     create: async (req, res) => {
//         try {
//             const { nom, description, localisation, menu, user_id } = req.body;
//             const newRestaurant = new Restaurant({
//                 nom,
//                 description,
//                 localisation,
//                 menu,
//                 utilisateur_id: user_id
//             });
//             const savedRestaurant = await newRestaurant.save();
//             res.json({
//                 data: savedRestaurant
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({
//                 state: "error"
//             });
//         }
//     },

//     update: async (req, res) => {
//         try {
//             const { nom, description, localisation, menu } = req.body;
//             const { id } = req.params;
//             const updatedRestaurant = await Restaurant.findByIdAndUpdate(
//                 id,
//                 { nom, description, localisation, menu },
//                 { new: true }
//             );
//             res.json({
//                 data: updatedRestaurant
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({
//                 state: "error"
//             });
//         }
//     },

//     cloudinary: async (req, res) => {
//         try {
//             const { menu } = req.body;
//             const { id } = req.params;
//             const updatedRestaurant = await Restaurant.findByIdAndUpdate(
//                 id,
//                 { menu },
//                 { new: true }
//             );
//             res.json({
//                 data: updatedRestaurant
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({
//                 state: "error"
//             });
//         }
//     },

//     delete: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
//             res.json({
//                 data: deletedRestaurant
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({
//                 state: "error"
//             });
//         }
//     }
// };

// module.exports = restaurantController;