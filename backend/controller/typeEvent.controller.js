const pool = require("../service/dbConnection")
const typeEventController = {

    selectAll: async (req,res) => {
        try {
            const [rows, fields] = await pool.query("select * from typeEvent")
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
            const [rows, fields] = await pool.query("select * from typeEvent WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    create: async (req,res) => {
        try {
            const { nom } = req.body
            const sql = "insert into typeEvent (nom) values (?)"
            const [rows, fields] = await pool.query(sql, [nom])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req,res) => {
        try {
            const { nom } = req.body
            const { id } = req .params
            const sql = "update typeEvent set nom = ? WHERE id =?"
            const [rows, fields] = await pool.query(sql, [nom, id])
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
            const [rows, fields] = await pool.query("delete from typeEvent WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = typeEventController