const Utilisateur = require("../models/Utilisateur");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken'); // 👈 AJOUTER

const connexionController = {
    // login: async (req, res) => {
    //     try {
    //         console.log('🔐 Tentative de connexion pour:', req.body.email);
            
    //         const { email, password } = req.body;
            
    //         const user = await Utilisateur.findOne({ email }).populate('role_id');
            
    //         if (!user) {
    //             console.log('❌ Utilisateur non trouvé:', email);
    //             return res.json({ 
    //                 state: "error", 
    //                 message: "Utilisateur non trouvé" 
    //             });
    //         }

    //         if (!user.isActive) {
    //             console.log('🚫 Utilisateur bloqué:', email);
    //             return res.json({ 
    //                 state: "error", 
    //                 message: "Votre compte a été désactivé. Contactez l'administrateur." 
    //             });
    //         }
            
    //         console.log('✅ Utilisateur trouvé:', user.email);
            
    //         const isValidPassword = await argon2.verify(user.password, password);
    //         console.log('🔐 Vérification argon2:', isValidPassword);
            
    //         if (!isValidPassword) {
    //             console.log('❌ Mot de passe incorrect pour:', email);
    //             return res.json({ 
    //                 state: "error", 
    //                 message: "Mot de passe incorrect" 
    //             });
    //         }
            
    //         // 🆕 GÉNÉRER LE TOKEN JWT
    //         const token = jwt.sign(
    //             {
    //                 utilisateur_id: user._id,
    //                 email: user.email,
    //                 role_id: user.role_id._id,
    //                 role_nom: user.role_id.nom
    //             },
    //             'jwtSecretKey',
    //             { expiresIn: '24h' }
    //         );

    //         console.log('🎉 Connexion réussie pour:', user.email);
    //         console.log('🔑 Token généré:', token.substring(0, 20) + '...');
            
    //         res.json({ 
    //             state: "success",
    //             message: "Connexion réussie",
    //             token: token, // 👈 AJOUTER LE TOKEN
    //             data: user
    //         });
            
    //     } catch (error) {
    //         console.error('💥 Erreur de connexion:', error);
    //         res.json({ 
    //             state: "error", 
    //             message: "Erreur serveur lors de la connexion" 
    //         });
    //     }
    // },

    login: async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await Utilisateur.findOne({ email }).populate('role_id');
        
        if (!user) {
            return res.json({ state: "error", message: "Utilisateur non trouvé" });
        }

        if (!user.isActive) {
            return res.json({ state: "error", message: "Votre compte a été désactivé." });
        }
        
        const isValidPassword = await argon2.verify(user.password, password);
        
        if (!isValidPassword) {
            return res.json({ state: "error", message: "Mot de passe incorrect" });
        }
        
        const token = jwt.sign(
            {
                utilisateur_id: user._id,
                email: user.email,
                role_id: user.role_id._id,
                role_nom: user.role_id.nom  // 👈 "admin" | "restaurateur" | "client"
            },
            process.env.JWT_SECRET, // ✅ Variable d'environnement
            { expiresIn: '24h' }
        );
        
        res.json({ 
            state: "success",
            message: "Connexion réussie",
            token: token,
            data: {
                _id: user._id,
                email: user.email,
                nom: user.nom,
                prenom: user.prenom,
                role_id: {
                    nom: user.role_id.nom  // 👈 CRITIQUE pour la redirection
                }
            }
        });
        
    // Dans le catch de login()
} catch (error) {
    console.error('❌ ERREUR CONNEXION DÉTAILLÉE:', error.message); // 👈 AJOUTER
    console.error('❌ STACK:', error.stack); // 👈 AJOUTER
    res.status(500).json({ state: "error", message: "Erreur serveur" });
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