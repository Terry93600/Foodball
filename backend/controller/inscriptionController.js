const Utilisateur = require("../models/Utilisateur");
const Restaurant = require("../models/Restaurant");
const Role = require("../models/Role");
const Team = require("../models/Team");
const TypeEvent = require("../models/TypeEvent");
const argon2 = require('argon2');

const inscriptionController = {
    create: async (req, res) => {
        console.log('🚀 INSCRIPTION CONTROLLER APPELÉ !', req.body); // ← LOG DE DEBUG
        
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
    codePostal: "00000",        // ← AJOUTÉ
    ville: "Ville à définir",   // ← AJOUTÉ
    telephone: telephone,       // ← AJOUTÉ
    email: email,              // ← AJOUTÉ
    capacite: 50,              // ← AJOUTÉ
    prixMoyen: 20,             // ← AJOUTÉ
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
                    errors: restaurantError.errors
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
            console.log('❌ Erreur inscription:', error);
            
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
    },

    createRestaurateur: async (req, res) => {
        try {
            const { email, nom, prenom, telephone, password } = req.body;

            const existingUser = await Utilisateur.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ state: "error", message: "Email déjà utilisé" });
            }

            const role = await Role.findOne({ nom: 'restaurateur' });
            if (!role) return res.status(500).json({ state: "error", message: "Rôle non trouvé" });

            const newUser = new Utilisateur({ email, nom, prenom, telephone, password, role_id: role._id });
            await newUser.validate();
            newUser.password = await argon2.hash(password);
            const savedUser = await newUser.save({ validateBeforeSave: false });

            const defaultRestaurant = new Restaurant({
                nom: `Restaurant de ${prenom} ${nom}`,
                description: `Bienvenue ! Personnalisez votre établissement.`,
                localisation: "Adresse à définir",
                codePostal: "00000",
                ville: "Ville à définir",
                telephone,
                email,
                capacite: 50,
                prixMoyen: 20,
                utilisateur_id: savedUser._id
            });
            const savedRestaurant = await defaultRestaurant.save();

            res.status(201).json({
                state: "success",
                message: "Inscription restaurateur réussie !",
                data: { user: savedUser, restaurant: savedRestaurant }
            });

        } catch (error) {
            if (error.name === 'ValidationError') {
                const errors = Object.values(error.errors).map(e => e.message);
                return res.status(400).json({ state: "error", message: "Erreurs de validation", errors });
            }
            res.status(500).json({ state: "error", message: "Erreur serveur" });
        }
    },

    createClient: async (req, res) => {
        try {
            const { email, nom, prenom, telephone, password } = req.body;

            const existingUser = await Utilisateur.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ state: "error", message: "Email déjà utilisé" });
            }

            const role = await Role.findOne({ nom: 'client' });
            if (!role) return res.status(500).json({ state: "error", message: "Rôle non trouvé" });

            const newUser = new Utilisateur({ email, nom, prenom, telephone, password, role_id: role._id });
            await newUser.validate();
            newUser.password = await argon2.hash(password);
            const savedUser = await newUser.save({ validateBeforeSave: false });

            res.status(201).json({
                state: "success",
                message: "Inscription client réussie !",
                data: { user: savedUser }
            });

        } catch (error) {
            if (error.name === 'ValidationError') {
                const errors = Object.values(error.errors).map(e => e.message);
                return res.status(400).json({ state: "error", message: "Erreurs de validation", errors });
            }
            res.status(500).json({ state: "error", message: "Erreur serveur" });
        }
    }
};

module.exports = inscriptionController;