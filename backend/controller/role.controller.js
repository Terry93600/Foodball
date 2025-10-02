// const pool = require("../service/dbConnection")
// const roleController = {

//     selectAll: async (req,res) => {
//         try {
//             const [rows, fields] = await pool.query("select * from role")
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
//             const [rows, fields] = await pool.query("select * from role WHERE id = ?", [id])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     },
//     create: async (req,res) => {
//         try {
//             const { name } = req.body
//             const sql = "insert into role (name) values (?)"
//             const [rows, fields] = await pool.query(sql, [name])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     },
//     update: async (req,res) => {
//         try {
//             const { name } = req.body
//             const { id } = req .params
//             const sql = "update role set name = ? WHERE id =?"
//             const [rows, fields] = await pool.query(sql, [name, id])
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
//             const [rows, fields] = await pool.query("delete * from role WHERE id = ?", [id])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

// module.exports = roleController


const Role = require("../models/Role");

const roleController = {
    selectAll: async (req, res) => {
        try {
            const roles = await Role.find();
            res.json({
                data: roles
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
            const role = await Role.findById(id);
            res.json({
                data: role
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
            const { nom } = req.body;
            const newRole = new Role({ nom });
            const savedRole = await newRole.save();
            res.json({
                data: savedRole
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
            const { nom } = req.body;
            const { id } = req.params;
            const updatedRole = await Role.findByIdAndUpdate(
                id,
                { nom },
                { new: true }
            );
            res.json({
                data: updatedRole
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
            const deletedRole = await Role.findByIdAndDelete(id);
            res.json({
                data: deletedRole
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                state: "error"
            });
        }
    }
};

module.exports = roleController;