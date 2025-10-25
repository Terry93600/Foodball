// const Utilisateur = require("../models/Utilisateur");
// const argon2 = require('argon2');
// const bcrypt = require('bcrypt');

// const connexionController = {
//         login: async (req, res) => {
//             try {
//                 console.log('🔐 Tentative de connexion pour:', req.body.email);
                
//                 const { email, password } = req.body;
                
//                 // 1️⃣ Chercher l'utilisateur
//                 const user = await Utilisateur.findOne({ email }).populate('role_id');
                
//                 if (!user) {
//                     console.log('❌ Utilisateur non trouvé:', email);
//                     return res.json({
//                         state: "error",
//                         message: "Utilisateur non trouvé"
//                     });
//                 }
                
//                 console.log('✅ Utilisateur trouvé:', user.email);
//                 console.log('🔐 Hash en BDD:', user.password);
//                 console.log('🔐 Mot de passe reçu:', password);
                
//                 // 2️⃣ Vérifier le mot de passe
//                 const isValidPassword = await argon2.verify(user.password, password);
//                 console.log('🔐 Vérification argon2:', isValidPassword);
                
//                 if (!isValidPassword) {
//                     console.log('❌ Mot de passe incorrect pour:', email);
//                     return res.json({
//                         state: "error",
//                         message: "Mot de passe incorrect"
//                     });
//                 }
                
//                 console.log('🎉 Connexion réussie pour:', user.email);
                
//                 // 3️⃣ ✅ STRUCTURE DE RÉPONSE CORRIGÉE
//                 res.json({
//                     state: "success",
//                     message: "Connexion réussie",
//                     data: user  // ← Le frontend cherche response.data.data
//                 });
                
//             } catch (error) {
//                 console.error('💥 Erreur de connexion:', error);
//                 res.json({
//                     state: "error",
//                     message: "Erreur serveur lors de la connexion"
//                 });
//             }
//         },

//     // Méthodes supplémentaires pour les routes existantes
//     selectAll: async (req, res) => {
//         try {
//             const users = await Utilisateur.find().populate('role_id').select('-password');
//             res.json({ data: users });
//         } catch (error) {
//             res.json({ state: "error" });
//         }
//     },

//     selectOne: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const user = await Utilisateur.findById(id).populate('role_id').select('-password');
//             res.json({ data: user });
//         } catch (error) {
//             res.json({ state: "error" });
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
            
//             res.json({ data: userResponse });
//         } catch (error) {
//             res.json({ state: "error" });
//         }
//     },

//     update: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const updatedUser = await Utilisateur.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
//             res.json({ data: updatedUser });
//         } catch (error) {
//             res.json({ state: "error" });
//         }
//     },

//     delete: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const deletedUser = await Utilisateur.findByIdAndDelete(id).select('-password');
//             res.json({ data: deletedUser });
//         } catch (error) {
//             res.json({ state: "error" });
//         }
//     }
// };

// module.exports = connexionController;

const Utilisateur = require("../models/Utilisateur");
const argon2 = require('argon2');

const connexionController = {
    login: async (req, res) => {
        try {
            console.log('🔐 Tentative de connexion pour:', req.body.email);
            
            const { email, password } = req.body;
            
            const user = await Utilisateur.findOne({ email }).populate('role_id');
            
            if (!user) {
                console.log('❌ Utilisateur non trouvé:', email);
                return res.json({ 
                    state: "error", 
                    message: "Utilisateur non trouvé" 
                });
            }

            // 🚫 VÉRIFICATION SI L'UTILISATEUR EST BLOQUÉ
            if (!user.isActive) {
                console.log('🚫 Utilisateur bloqué:', email);
                return res.json({ 
                    state: "error", 
                    message: "Votre compte a été désactivé. Contactez l'administrateur." 
                });
            }
            
            console.log('✅ Utilisateur trouvé:', user.email);
            
            const isValidPassword = await argon2.verify(user.password, password);
            console.log('🔐 Vérification argon2:', isValidPassword);
            
            if (!isValidPassword) {
                console.log('❌ Mot de passe incorrect pour:', email);
                return res.json({ 
                    state: "error", 
                    message: "Mot de passe incorrect" 
                });
            }
            
            console.log('🎉 Connexion réussie pour:', user.email);
            
            res.json({ 
                state: "success",
                message: "Connexion réussie",
                data: user
            });
            
        } catch (error) {
            console.error('💥 Erreur de connexion:', error);
            res.json({ 
                state: "error", 
                message: "Erreur serveur lors de la connexion" 
            });
        }
    },

    selectAll: async (req, res) => {
        try {
            const users = await Utilisateur.find().populate('role_id').select('-password');
            res.json({ data: users });
        } catch (error) {
            res.json({ state: "error" });
        }
    },

    selectOne: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await Utilisateur.findById(id).populate('role_id').select('-password');
            res.json({ data: user });
        } catch (error) {
            res.json({ state: "error" });
        }
    },

    create: async (req, res) => {
        try {
            const { email, nom, prenom, telephone, password, role_id } = req.body;
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
            const userResponse = { ...savedUser.toObject() };
            delete userResponse.password;
            
            res.json({ data: userResponse });
        } catch (error) {
            res.json({ state: "error" });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedUser = await Utilisateur.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
            res.json({ data: updatedUser });
        } catch (error) {
            res.json({ state: "error" });
        }
    },

    // 🆕 NOUVELLE ROUTE : Bloquer/Débloquer un utilisateur
    toggleActive: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await Utilisateur.findById(id);
            
            if (!user) {
                return res.json({ state: "error", message: "Utilisateur non trouvé" });
            }
            
            user.isActive = !user.isActive;
            await user.save();
            
            res.json({ 
                state: "success",
                message: user.isActive ? "Utilisateur activé" : "Utilisateur bloqué",
                data: user 
            });
        } catch (error) {
            console.error('Erreur toggleActive:', error);
            res.json({ state: "error" });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedUser = await Utilisateur.findByIdAndDelete(id).select('-password');
            res.json({ data: deletedUser });
        } catch (error) {
            res.json({ state: "error" });
        }
    }
};

module.exports = connexionController;