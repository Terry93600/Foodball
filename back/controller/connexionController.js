const pool = require("../service/dbConnection")
const connexionController = {

    selectAll: async (req,res) => {
        try {
            const [rows, fields] = await pool.query("select * from connexion")
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
            const [rows, fields] = await pool.query("select * from connexion WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    create: async (req,res) => {
        try {
            const { email, password } = req.body
            const sql = "insert into connexion (email, password ) values (?,?)"
            const [rows, fields] = await pool.query(sql, [email, password])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req,res) => {
        try {
            const { email, password } = req.body
            const { id } = req .params
            const sql = "update connexion set email = ?, password = ?  WHERE id =?"
            const [rows, fields] = await pool.query(sql, [email, password, id])
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
            const [rows, fields] = await pool.query("delete * from connexion WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = connexionController