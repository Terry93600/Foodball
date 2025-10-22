const Utilisateur = require("../models/Utilisateur");
const Restaurant = require("../models/Restaurant");
const Role = require("../models/Role");
const Event = require("../models/Event");
const argon2 = require("argon2");
const jwt = require('jsonwebtoken');

const inscriptionController = {
    selectAll: async (req, res) => {
        try {
            const users = await Utilisateur.find().populate('role_id');
            res.json({
                data: users,
            });
        } catch (error) {
            console.log(error);
            res.json({
                state: "error",
            });
        }
    },

    selectOne: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await Utilisateur.findById(id).populate('role_id');
            res.json({
                data: user,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                state: "error"
            });
        }
    },

    // create: async (req, res) => {
    //     try {
    //         const { email, name, password } = req.body;
    //         const hashedPassword = await argon2.hash(password);
            
    //         // Trouver le rôle "restaurateur"
    //         const restaurateurRole = await Role.findOne({ nom: "restaurateur" });
            
    //         // Créer l'utilisateur
    //         const newUser = new Utilisateur({
    //             email,
    //             name,
    //             password: hashedPassword,
    //             role_id: restaurateurRole._id
    //         });
    //         const savedUser = await newUser.save();

    //         // Créer le restaurant
    //         const newRestaurant = new Restaurant({
    //             nom: "Nom du restaurant",
    //             description: "Description du restaurant",
    //             localisation: "Localisation du restaurant",
    //             menu: "Menu du restaurant",
    //             utilisateur_id: savedUser._id
    //         });
    //         const savedRestaurant = await newRestaurant.save();

    //         // Associer à un événement par défaut
    //         const defaultEvent = await Event.findOne();
    //         if (defaultEvent) {
    //             savedRestaurant.events.push(defaultEvent._id);
    //             await savedRestaurant.save();
    //         }

    //         res.json({
    //             utilisateur_id: savedUser._id,
    //             utilisateur: savedUser,
    //             restaurant: savedRestaurant,
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({
    //             error: "Erreur lors de la création de l'utilisateur et du restaurant",
    //         });
    //     }
    // },

    create: async (req, res) => {
    try {
        const { email, nom, prenom, telephone, password, role_id } = req.body;
        
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await Utilisateur.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                state: "error",
                message: "Un utilisateur avec cet email existe déjà"
            });
        }
        
        const hashedPassword = await argon2.hash(password);
        
        const newUser = new Utilisateur({
            email,
            nom,
            prenom,
            telephone,
            password: hashedPassword,
            role_id
        });
        
        const savedUser = await newUser.save();
        
        res.status(201).json({
            state: "success",
            message: "Utilisateur créé avec succès",
            data: savedUser
        });
    } catch (error) {
        console.log(error);
        
        // Gestion des erreurs de validation Mongoose
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                state: "error",
                message: "Erreurs de validation",
                errors: errors
            });
        }
        
        res.status(500).json({
            state: "error",
            message: "Erreur lors de la création de l'utilisateur"
        });
    }
},

    update: async (req, res) => {
        try {
            const { email, name, password } = req.body;
            const { id } = req.params;
            
            const updateData = { email, name };
            if (password) {
                updateData.password = await argon2.hash(password);
            }

            const updatedUser = await Utilisateur.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            );
            
            res.json({
                data: updatedUser,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                state: "error"
            });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedUser = await Utilisateur.findByIdAndDelete(id);
            res.json({
                data: deletedUser,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                state: "error"
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            const user = await Utilisateur.findOne({ email }).populate('role_id');
            
            if (!user) {
                console.log('User not found');
                return res.status(403).json({
                    status: 403,
                    message: "Forbidden",
                });
            }

            const verifyHash = await argon2.verify(user.password, password);
            if (!verifyHash) {
                console.log('Password verification failed');
                return res.status(403).json({
                    status: 403,
                    message: "Forbidden",
                });
            }

            const token = jwt.sign(
                { utilisateur_id: user._id },
                "jwtSecretKey",
                { expiresIn: "1h" }
            );

            console.log('Login successful. Sending token.');
            return res.status(200).json({
                status: 200,
                message: "OK",
                userData: {
                    utilisateur_id: user._id,
                    token: token,
                    role: user.role_id.nom
                }
            });
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(400).json({
                status: 400,
                message: "Error",
            });
        }
    }
};

module.exports = inscriptionController;