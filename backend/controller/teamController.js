const pool = require("../service/dbConnection")
const teamController = {

    selectAll: async (req,res) => {
        try {
            const [rows, fields] = await pool.query("select * from team")
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
            const [rows, fields] = await pool.query("select * from team WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    create: async (req,res) => {
        try {
            const { nom, logo } = req.body
            const sql = "insert into team (nom, logo) values (?, ?)"
            const [rows, fields] = await pool.query(sql, [nom, logo])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req,res) => {
        try {
            const { nom, logo} = req.body
            const { id } = req .params
            const sql = "update team set nom = ?, logo = ? WHERE id =?"
            const [rows, fields] = await pool.query(sql, [nom, logo, id])
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
            const [rows, fields] = await pool.query("delete from team WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = teamController