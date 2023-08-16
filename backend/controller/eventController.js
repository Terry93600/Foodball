const pool = require("../service/dbConnection")
const eventController = {

    selectAll: async (req,res) => {
        try {
            const [rows, fields] = await pool.query("select * from event")
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
            const [rows, fields] = await pool.query("select * from event WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    create: async (req,res) => {
        try {
            const { team1_id, team2_id, typeEvent_id } = req.body
            const sql = "insert into role (team1_id, team2_id, typeEvent_id ) values (?,?,?)"
            const [rows, fields] = await pool.query(sql, [team1_id, team2_id, typeEvent_id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req,res) => {
        try {
            const { team1_id, team2_id, typeEvent_id } = req.body
            const { id } = req .params
            const sql = "update role set team1_id = ?, team2_id = ?, typeEvent_id = ?  WHERE id =?"
            const [rows, fields] = await pool.query(sql, [team1_id, team2_id, typeEvent_id, id])
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
            const [rows, fields] = await pool.query("delete * from restaurant WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = eventController