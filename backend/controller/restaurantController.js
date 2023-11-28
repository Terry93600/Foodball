const pool = require("../service/dbConnection")
const restaurantController = {

    selectAllFoodball: async (req,res) => {
        try {
            const [rows, fields] = await pool.query(`
            select restaurant.*,
            t1.nom as team1,
            t2.nom as team2,
            utilisateur.email, 
            typeEvent.nom as typeEvent,
            restaurant.localisation,
            restaurant.menu

            FROM foodball.restaurant
            JOIN foodball.event
            JOIN foodball.restaurantEvent
            ON restaurantEvent.event_id = event.id
            AND restaurantEvent.restaurant_id = restaurant.id
            JOIN foodball.team as t1
            ON t1.id = event.team1_id
            JOIN foodball.team as t2
            ON t2.id = event.team2_id
            JOIN foodball.utilisateur
            ON utilisateur.id = restaurant.utilisateur_id
            JOIN foodball.role 
            ON role.id = utilisateur.role_id
            JOIN foodball.typeEvent
            ON typeEvent.id = event.typeEvent_id
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

    selectAll: async (req,res) => {
        try {
            const [rows, fields] = await pool.query(`
            SELECT restaurant.*,
            utilisateur.email
            FROM foodball.restaurant
            JOIN foodball.utilisateur ON utilisateur.id = restaurant.utilisateur_id
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
            const [rows, fields] = await pool.query("select * from restaurant WHERE id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    create: async (req,res) => {
        try {
            const { nom, description, localisation, menu, user_id  } = req.body
            const sql = "insert into restaurant (nom, description, localisation, menu ) values (?,?,?,?)"
            const [rows, fields] = await pool.query(sql, [nom, description, localisation, menu, user_id ])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req,res) => {
        try {
            const { nom, description, localisation, menu  } = req.body
            const { id } = req .params
            const sql = "update restaurant set nom = ?, description = ?,localisation = ?, menu = ?  WHERE id =?"
            const [rows, fields] = await pool.query(sql, [nom, description, localisation, menu , id])
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

module.exports = restaurantController