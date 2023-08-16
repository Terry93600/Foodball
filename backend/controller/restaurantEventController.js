const pool = require("../service/dbConnection")
const restaurantEventController = {

    selectAll: async (req,res) => {
        try {
            const [rows, fields] = await pool.query("select * from restaurantEvent")
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
            const [rows, fields] = await pool.query("select * from restaurantEvent WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    create: async (req,res) => {
        try {
            const { restaurant_id, event_id} = req.body
            const sql = "insert into restaurantEvent (restaurant_id, event_id ) values (?,?)"
            const [rows, fields] = await pool.query(sql, [restaurant_id, event_id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req,res) => {
        try {
            const { restaurant_id, event_id } = req.body
            const { id } = req .params
            const sql = "update restaurantEvent set restaurant_id=?, event_id=?  WHERE id =?"
            const [rows, fields] = await pool.query(sql, [restaurant_id, event_id])
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
            const [rows, fields] = await pool.query("delete * from restaurantEvent WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = restaurantEventController