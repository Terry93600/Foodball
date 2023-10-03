const pool = require("../service/dbConnection")
const platController = {

    selectAll: async (req,res) => {
        try {
            const [rows, fields] = await pool.query(`
            select * from plat
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
            const [rows, fields] = await pool.query("select * from plat WHERE id = ?", [id])
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
            const sql = "update plat set nom = ?, description = ? WHERE id =?"
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
            const [rows, fields] = await pool.query("delete * from plat WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = platController