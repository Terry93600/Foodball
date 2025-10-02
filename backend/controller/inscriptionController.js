// const pool = require("../service/dbConnection");
// const argon2 = require("argon2");
// const jwt = require('jsonwebtoken');


// const inscriptionController = {
// 	selectAll: async (req, res) => {
// 		try {
// 			const [rows, fields] = await pool.query("select * from utilisateur");
// 			res.json({
// 				data: rows,
// 			});
// 		} catch (error) {
// 			console.log(error);
// 			res.json({
// 				state: "error",
// 			});
// 		}
// 	},
// 	selectOne: async (req, res) => {
// 		try {
// 			const { id } = req.params;
// 			const [rows, fields] = await pool.query(
// 				"select * from utilisateur WHERE id = ?",
// 				[id],
// 			);
// 			res.json({
// 				data: rows,
// 			});
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	},
	
// 	create: async (req, res) => {
// 		try {
// 		  const { email, name, password } = req.body;
// 		  const hashedPassword = await argon2.hash(password);
// 		  const userSql =
// 			"INSERT INTO utilisateur (email, name, password, role_id) VALUES (?, ?, ?, 2)";
// 		  const [userRows, userFields] = await pool.query(userSql, [
// 			email,
// 			name,
// 			hashedPassword,
// 		  ])
// 		const utilisateur_id = userRows.insertId;
// 		const restaurantSql =
// 		"INSERT INTO restaurant (nom, description, localisation, menu, utilisateur_id) VALUES (?, ?, ?, ?, ?)";
// 		const [restaurantRows, restaurantFields] = await pool.query(restaurantSql, [
// 		"Nom du restaurant",
// 		"Description du restaurant",
// 		"Localisation du restaurant",
// 		"Menu du restaurant",
// 		utilisateur_id,
// 		]);
// 		const restaurantId = restaurantRows.insertId;
// 		const selectedEventId = 1;
// 		const restaurantEventSql =
// 		"INSERT INTO restaurantEvent (restaurant_id, event_id) VALUES (?, ?)";
// 		const [restaurantEventRows, restaurantEventFields] = await pool.query(
// 		restaurantEventSql,
// 		[restaurantId, selectedEventId]
// 		);
// 		res.json({
// 			utilisateur_id: utilisateur_id,
// 			utilisateur: userRows,
// 			restaurant: restaurantRows,
// 			restaurantEvent: restaurantEventRows,
// 		});
// 		} catch (error) {
// 		console.error(error);
// 		res.status(500).json({
// 			error:
// 			"Erreur lors de la création de l'utilisateur, du restaurant, de l'événement et de la relation restaurantEvent",
// 		});
// 		}
// 	  },
	  
// 	update: async (req, res) => {
// 		try {
// 			const { email, name, password } = req.body;
// 			const { id } = req.params;
// 			const sql =
// 				"update utilisateur set email = ?, name = ?, password = ?  WHERE id =?";
// 			const [rows, fields] = await pool.query(sql, [email, name, password, id]);
// 			res.json({
// 				data: rows,
// 			});
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	},
// 	delete: async (req, res) => {
// 		try {
// 			const { id } = req.params;
// 			const [rows, fields] = await pool.query(
// 				"delete * from utilisateur WHERE id = ?",
// 				[id],
// 			);
// 			res.json({
// 				data: rows,
// 			});
// 		} catch (error) {
// 			console.log(error);
// 		}
//     },
// login: async (req, res) => {
// 	let rows;
// 	try {
// 		const { email, password } = req.body;
// 		rows = await pool.query(
// 			"SELECT utilisateur.*, role.nom FROM foodball.utilisateur JOIN foodball.role ON role.id = utilisateur.role_id WHERE utilisateur.email = ?",
// 			[email]
// 		);
// 		console.log('Rows:', rows);
// 		if (rows[0].length === 0) {
// 			console.log('User not found or invalid ID');
// 			return res.status(403).json({
// 				status: 403,
// 				message: "Forbidden",
// 			});
// 			} else {
// 			const verifyHash = await argon2.verify(rows[0][0].password, password);
// 			if (!verifyHash) {
// 				console.log('Password verification failed');
// 				return res.status(403).json({
// 					status: 403,
// 					message: "Forbidden",
// 				});
// 			}
// 			console.log('Utilisateur ID:', rows[0][0].id);
// 			const token = jwt.sign(
// 				{ utilisateur_id: rows[0][0].id },
// 				"jwtSecretKey",
// 				{ expiresIn: "1h" }
// 			);
// 			console.log('Login successful. Sending token.');
// 			return res.status(200).json({
// 				status: 200,
// 				message: "OK",
// 				userData: {
// 					utilisateur_id: rows[0][0].id,
// 					token: token,
// 					role: rows[0][0].nom
// 				}
// 			});
// 			}
// 				} catch (error) {
// 					console.error('Error during login:', error);
// 					return res.status(400).json({
// 						status: 400,
// 						message: "Error",
// 					});
// 				}
// 			}
// };

// module.exports = inscriptionController;


const Utilisateur = require("../models/Utilisateur");
const Restaurant = require("../models/Restaurant");
const Event = require("../models/Event");
const argon2 = require('argon2');

const inscriptionController = {
    // Méthode principale pour l'inscription
    create: async (req, res) => {
        try {
            const { email, name, password, role_id, nom, description, localisation, menu, event_id } = req.body;
            
            const hashedPassword = await argon2.hash(password);
            
            const newUser = new Utilisateur({
                email,
                name,
                password: hashedPassword,
                role_id
            });
            const savedUser = await newUser.save();
            
            const newRestaurant = new Restaurant({
                nom,
                description,
                localisation,
                menu,
                utilisateur_id: savedUser._id,
                events: [event_id]
            });
            const savedRestaurant = await newRestaurant.save();
            
            res.json({
                data: {
                    user: savedUser,
                    restaurant: savedRestaurant
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                state: "error"
            });
        }
    },

    // Méthodes supplémentaires pour les routes existantes
    selectAll: async (req, res) => {
        try {
            const users = await Utilisateur.find().populate('role_id');
            res.json({ data: users });
        } catch (error) {
            res.json({ state: "error" });
        }
    },

    selectOne: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await Utilisateur.findById(id).populate('role_id');
            res.json({ data: user });
        } catch (error) {
            res.json({ state: "error" });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedUser = await Utilisateur.findByIdAndUpdate(id, req.body, { new: true });
            res.json({ data: updatedUser });
        } catch (error) {
            res.json({ state: "error" });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedUser = await Utilisateur.findByIdAndDelete(id);
            res.json({ data: deletedUser });
        } catch (error) {
            res.json({ state: "error" });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Utilisateur.findOne({ email }).populate('role_id');
            
            if (!user) {
                return res.json({ state: "error", message: "Utilisateur non trouvé" });
            }
            
            const isValidPassword = await argon2.verify(user.password, password);
            if (!isValidPassword) {
                return res.json({ state: "error", message: "Mot de passe incorrect" });
            }
            
            res.json({ data: user });
        } catch (error) {
            res.json({ state: "error" });
        }
    }
};

module.exports = inscriptionController;