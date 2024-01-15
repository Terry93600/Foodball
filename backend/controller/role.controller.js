const pool = require("../service/dbConnection")
const roleController = {

    selectAll: async (req,res) => {
        try {
            const [rows, fields] = await pool.query("select * from role")
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
            const [rows, fields] = await pool.query("select * from role WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    create: async (req,res) => {
        try {
            const { name } = req.body
            const sql = "insert into role (name) values (?)"
            const [rows, fields] = await pool.query(sql, [name])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req,res) => {
        try {
            const { name } = req.body
            const { id } = req .params
            const sql = "update role set name = ? WHERE id =?"
            const [rows, fields] = await pool.query(sql, [name, id])
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

module.exports = roleController