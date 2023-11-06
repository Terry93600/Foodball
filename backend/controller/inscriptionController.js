const pool = require("../service/dbConnection")
const inscriptionController = {

    selectAll: async (req,res) => {
        try {
            const [rows, fields] = await pool.query("select * from utilisateur")
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
            const [rows, fields] = await pool.query("select * from utilisateur WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    create: async (req,res) => {
        try {
            const { email, name, password } = req.body
            const sql = "insert into utilisateur (email, name, password ) values (?,?,?)"
            const [rows, fields] = await pool.query(sql, [email, name, password])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req,res) => {
        try {
            const { email, name, password } = req.body
            const { id } = req .params
            const sql = "update utilisateur set email = ?, name = ?, password = ?  WHERE id =?"
            const [rows, fields] = await pool.query(sql, [email, name, password, id])
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
            const [rows, fields] = await pool.query("delete * from utilisateur WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = inscriptionController