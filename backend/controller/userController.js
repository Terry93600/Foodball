const pool = require("../service/dbConnection")
const userController = {

    selectAll: async (req,res) => {
        try {
            const [rows, fields] = await pool.query("select * from user")
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
            res.json({
                state:"error"
            })
        }
    },
    selectOne: async (req,res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("select * from user WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    create: async (req,res) => {
        try {
            const { email, nom, prenom, role_id } = req.body
            const sql = "insert into user (email, nom, prenom, role_id) values (?,?,?,?)"
            const [rows, fields] = await pool.query(sql, [email, nom, prenom, role_id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req,res) => {
        try {
            const { email, nom, prenom, role_id } = req.body
            const { id } = req .params
            const sql = "update user set nom = ?, email=?, prenom=?, role_id = ? WHERE id =?"
            const [rows, fields] = await pool.query(sql, [email, nom, prenom, role_id, id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    delete: async (req,res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("delete * from role WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = userController