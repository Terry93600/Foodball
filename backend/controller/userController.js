// const Utilisateur = require("../models/Utilisateur");
// const argon2 = require('argon2');

// const userController = {
//     selectAll: async (req, res) => {
//         try {
//             const users = await Utilisateur.find()
//                 .populate('role_id', 'nom')
//                 .select('-password');
            
//             const formattedUsers = users.map(user => ({
//                 id: user._id,
//                 email: user.email,
//                 name: user.name,
//                 role_id: user.role_id._id,
//                 role_nom: user.role_id.nom
//             }));

//             res.json({
//                 data: formattedUsers
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
//             const user = await Utilisateur.findById(id)
//                 .populate('role_id')
//                 .select('-password');
//             res.json({
//                 data: user
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
//             const { email, name, password, role_id } = req.body;
//             const hashedPassword = await argon2.hash(password);
            
//             const newUser = new Utilisateur({
//                 email,
//                 name,
//                 password: hashedPassword,
//                 role_id
//             });
            
//             const savedUser = await newUser.save();
//             const userResponse = { ...savedUser.toObject() };
//             delete userResponse.password;
            
//             res.json({
//                 data: userResponse
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
//             const { email, name, role_id } = req.body;
//             const { id } = req.params;
            
//             const updatedUser = await Utilisateur.findByIdAndUpdate(
//                 id,
//                 { email, name, role_id },
//                 { new: true }
//             ).select('-password');
            
//             res.json({
//                 data: updatedUser
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
//             const deletedUser = await Utilisateur.findByIdAndDelete(id)
//                 .select('-password');
//             res.json({
//                 data: deletedUser
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({
//                 state: "error"
//             });
//         }
//     }
// };

// module.exports = userController;


const Utilisateur = require("../models/Utilisateur");
const Restaurant = require("../models/Restaurant");
const Team = require("../models/Team");
const TypeEvent = require("../models/TypeEvent");
const argon2 = require('argon2');

const userController = {
    selectAll: async (req, res) => {
        try {
            const users = await Utilisateur.find()
                .populate('role_id', 'nom')
                .select('-password');
            
            res.json({
                data: users
            });
        } catch (error) {
            console.log(error);
            res.json({
                state: "error"
            });
        }
    },

    selectOne: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await Utilisateur.findById(id)
                .populate('role_id')
                .select('-password');
            res.json({
                data: user
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                state: "error"
            });
        }
    },

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
            
            // ✅ CRÉER D'ABORD avec le mot de passe en clair pour validation
            const newUser = new Utilisateur({
                email,
                nom,
                prenom,
                telephone,
                password, // ← Mot de passe en clair pour validation
                role_id
            });
            
            // ✅ VALIDER avant de hasher
            await newUser.validate();
            
            // ✅ MAINTENANT hasher le mot de passe
            newUser.password = await argon2.hash(password);
            
            // ✅ SAUVEGARDER avec le mot de passe hashé
            const savedUser = await newUser.save({ validateBeforeSave: false });
            
// 🏪 CRÉER UN RESTAURANT PAR DÉFAUT
console.log('🔄 Début création restaurant pour utilisateur:', savedUser._id);

try {
    // Récupérer la première équipe et le premier type d'événement
    const defaultTeam = await Team.findOne();
    const defaultTypeEvent = await TypeEvent.findOne();
    
    console.log('📊 Données récupérées:', {
        defaultTeam: defaultTeam?._id,
        defaultTypeEvent: defaultTypeEvent?._id,
        userPrenom: prenom,
        userNom: nom
    });
    
    const restaurantData = {
        nom: `Restaurant de ${prenom} ${nom}`,
        description: `Bienvenue dans le restaurant de ${prenom} ! Personnalisez votre établissement dans votre espace de gestion.`,
        localisation: "Adresse à définir - Cliquez pour modifier",
        codePostal: "00000",
        ville: "Ville à définir",
        telephone: telephone,
        email: email,
        capacite: 50,
        prixMoyen: 20,
        menu: "🍕 Menu en cours de création\n\n📝 Ajoutez vos spécialités ici !\n\n✨ Personnalisez votre carte dans votre espace de gestion.",
        utilisateur_id: savedUser._id,
        team1: defaultTeam?._id || null,
        team2: defaultTeam?._id || null,
        typeEvent: defaultTypeEvent?._id || null
    };
    
    console.log('🏪 Données restaurant à créer:', restaurantData);
    
    const defaultRestaurant = new Restaurant(restaurantData);
    console.log('✅ Restaurant model créé, validation...');
    
    const savedRestaurant = await defaultRestaurant.save();
    console.log('🎉 Restaurant sauvegardé avec succès:', savedRestaurant._id);
    
    res.status(201).json({
        state: "success",
        message: "Inscription réussie ! Votre restaurant a été créé automatiquement.",
        data: {
            user: savedUser,
            restaurant: savedRestaurant
        }
    });
    
} catch (restaurantError) {
    console.error('❌ ERREUR DÉTAILLÉE création restaurant:', {
        message: restaurantError.message,
        name: restaurantError.name,
        errors: restaurantError.errors,
        stack: restaurantError.stack
    });
    
    // Si la création du restaurant échoue, on garde l'utilisateur mais on informe
    res.status(201).json({
        state: "success",
        message: "Inscription réussie ! Vous pourrez créer votre restaurant plus tard.",
        data: {
            user: savedUser,
            restaurant: null,
            warning: "Le restaurant par défaut n'a pas pu être créé.",
            error: restaurantError.message
        }
    });
}
            
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
            const { email, nom, prenom, telephone, role_id } = req.body;
            const { id } = req.params;
            
            const updatedUser = await Utilisateur.findByIdAndUpdate(
                id,
                { email, nom, prenom, telephone, role_id },
                { new: true }
            ).select('-password');
            
            res.json({
                data: updatedUser
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
            const deletedUser = await Utilisateur.findByIdAndDelete(id)
                .select('-password');
            res.json({
                data: deletedUser
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                state: "error"
            });
        }
    }
};

module.exports = userController;