// const pool = require("../service/dbConnection")
// const restaurantController = {

//     selectAllFoodball: async (req,res) => {
//         try {
//             const [rows, fields] = await pool.query(`
//             select restaurant.*,
//             t1.nom as team1,
//             t2.nom as team2,
//             utilisateur.email,
//             typeEvent.nom as typeEvent,
//             restaurant.localisation,
//             restaurant.menu

//             FROM foodball.restaurant
//             JOIN foodball.event
//             JOIN foodball.restaurantEvent
//             ON restaurantEvent.event_id = event.id
//             AND restaurantEvent.restaurant_id = restaurant.id
//             JOIN foodball.team as t1
//             ON t1.id = event.team1_id
//             JOIN foodball.team as t2
//             ON t2.id = event.team2_id
//             JOIN foodball.utilisateur
//             ON utilisateur.id = restaurant.utilisateur_id
//             JOIN foodball.role
//             ON role.id = utilisateur.role_id
//             JOIN foodball.typeEvent
//             ON typeEvent.id = event.typeEvent_id
//             `)
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error);
//             res.json({
//                 state:"error"
//             })
//         }
//     },

//     selectAll: async (req,res) => {
//         try {
//             const [rows, fields] = await pool.query(`
//             SELECT restaurant.*,
//             utilisateur.email
//             FROM foodball.restaurant
//             JOIN foodball.utilisateur ON utilisateur.id = restaurant.utilisateur_id
//             `)
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error);
//             res.json({
//                 state:"error"
//             })
//         }
//     },

//     selectOne: async (req,res) => {
//         try {
//             const { id } = req.params
//             const [rows, fields] = await pool.query("select * from restaurant WHERE id = ?", [id])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     },
//     create: async (req,res) => {
//         try {
//             const { nom, description, localisation, menu, user_id  } = req.body
//             const sql = "insert into restaurant (nom, description, localisation, menu ) values (?,?,?,?)"
//             const [rows, fields] = await pool.query(sql, [nom, description, localisation, menu, user_id ])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     },
//     update: async (req,res) => {
//         try {
//             const { nom, description, localisation, menu  } = req.body
//             const { id } = req .params
//             const sql = "update restaurant set nom = ?, description = ?,localisation = ?, menu = ?  WHERE id =?"
//             const [rows, fields] = await pool.query(sql, [nom, description, localisation, menu , id])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     },
//     cloudinary: async (req,res) => {
//         try {
//             const { menu } = req.body
//             const { id } = req .params
//             const sql = "update restaurant set menu = ?  WHERE id =?"
//             const [rows, fields] = await pool.query(sql, [ menu , id])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     },
//     delete: async (req,res) => {
//         try {
//             const { id } = req.params
//             const [rows, fields] = await pool.query("delete * from restaurant WHERE id = ?", [id])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     }
    
    
// }

// module.exports = restaurantController

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

const Restaurant = require("../models/Restaurant");

const restaurantController = {
    selectAll: async (req, res) => {
        try {
            const restaurants = await Restaurant.find()
                .populate('utilisateur_id', 'name email')
                .populate('team1', 'nom')
                .populate('team2', 'nom')
                .populate('typeEvent', 'nom');
            
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
                .populate('utilisateur_id', 'name email')
                .populate('team1', 'nom')
                .populate('team2', 'nom')
                .populate('typeEvent', 'nom');
            
            res.json({ data: restaurant });
        } catch (error) {
            console.error('Erreur selectOne restaurant:', error);
            res.json({ state: "error" });
        }
    },

    create: async (req, res) => {
        try {
            const { nom, description, localisation, menu, utilisateur_id, team1, team2, typeEvent } = req.body;
            
            const newRestaurant = new Restaurant({
                nom,
                description,
                localisation,
                menu,
                utilisateur_id,
                team1,
                team2,
                typeEvent
            });
            
            const savedRestaurant = await newRestaurant.save();
            const populatedRestaurant = await Restaurant.findById(savedRestaurant._id)
                .populate('utilisateur_id', 'name email')
                .populate('team1', 'nom')
                .populate('team2', 'nom')
                .populate('typeEvent', 'nom');
            
            res.json({ data: populatedRestaurant });
        } catch (error) {
            console.error('Erreur create restaurant:', error);
            res.json({ state: "error" });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, req.body, { new: true })
                .populate('utilisateur_id', 'name email')
                .populate('team1', 'nom')
                .populate('team2', 'nom')
                .populate('typeEvent', 'nom');
            
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