// const pool = require("../service/dbConnection")
// const connexionController = {

//     selectAll: async (req,res) => {
//         try {
//             const [rows, fields] = await pool.query("select * from connexion")
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
//             const [rows, fields] = await pool.query("select * from connexion WHERE id = ?", [id])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     },
//     create: async (req,res) => {
//         try {
//             const { email, password } = req.body
//             const sql = "insert into connexion (email, password ) values (?,?)"
//             const [rows, fields] = await pool.query(sql, [email, password])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     },
//     update: async (req,res) => {
//         try {
//             const { email, password } = req.body
//             const { id } = req .params
//             const sql = "update connexion set email = ?, password = ?  WHERE id =?"
//             const [rows, fields] = await pool.query(sql, [email, password, id])
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
//             const [rows, fields] = await pool.query("delete * from connexion WHERE id = ?", [id])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

// module.exports = connexionController

const Utilisateur = require("../models/Utilisateur");
const argon2 = require('argon2');

const connexionController = {
    // Méthode principale pour la connexion
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            const user = await Utilisateur.findOne({ email })
                .populate('role_id', 'nom');
            
            if (!user) {
                return res.json({
                    state: "error",
                    message: "Utilisateur non trouvé"
                });
            }
            
            const isValidPassword = await argon2.verify(user.password, password);
            
            if (!isValidPassword) {
                return res.json({
                    state: "error",
                    message: "Mot de passe incorrect"
                });
            }
            
            const userData = {
                id: user._id,
                email: user.email,
                name: user.name,
                role_id: user.role_id._id,
                role_nom: user.role_id.nom
            };
            
            res.json({
                data: userData
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