const Utilisateur = require("../models/Utilisateur");
const argon2 = require('argon2');

const userController = {
    selectAll: async (req, res) => {
        try {
            const users = await Utilisateur.find()
                .populate('role_id', 'nom')
                .select('-password');
            
            const formattedUsers = users.map(user => ({
                id: user._id,
                email: user.email,
                name: user.name,
                role_id: user.role_id._id,
                role_nom: user.role_id.nom
            }));

            res.json({
                data: formattedUsers
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
            const { email, name, password, role_id } = req.body;
            const hashedPassword = await argon2.hash(password);
            
            const newUser = new Utilisateur({
                email,
                name,
                password: hashedPassword,
                role_id
            });
            
            const savedUser = await newUser.save();
            const userResponse = { ...savedUser.toObject() };
            delete userResponse.password;
            
            res.json({
                data: userResponse
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                state: "error"
            });
        }
    },

    update: async (req, res) => {
        try {
            const { email, name, role_id } = req.body;
            const { id } = req.params;
            
            const updatedUser = await Utilisateur.findByIdAndUpdate(
                id,
                { email, name, role_id },
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