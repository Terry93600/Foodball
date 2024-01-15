const pool = require("../service/dbConnection")
const menuController = {

    selectAll: async (req,res) => {
        try {
            const [rows, fields] = await pool.query(`
            select * from menu
            `)
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
            const [rows, fields] = await pool.query("select * from menu WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    create: async (req,res) => {
        try {
            const { nom, description } = req.body
            const sql = "insert into role (nom, description) values (?,?)"
            const [rows, fields] = await pool.query(sql, [nom, description ])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req,res) => {
        try {
            const { nom, description } = req.body
            const { id } = req .params
            const sql = "update menu set nom = ?, description = ? WHERE id =?"
            const [rows, fields] = await pool.query(sql, [nom, description, id])
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
            const [rows, fields] = await pool.query("delete * from menu WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = menuController