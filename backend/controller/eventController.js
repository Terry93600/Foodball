const pool = require("../service/dbConnection")
const eventController = {

    // selectAll: async (req,res) => {
    //     try {
    //         const [rows, fields] = await pool.query("select * from event")
    //         res.json({
    //             data: rows
    //         })
    //     } catch (error) {
    //         console.log(error);
    //         res.json({
    //             state:"error"
    //         })
    //     }
    // },
    selectAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query(`
                SELECT 
                    e.id AS event_id,
                    t1.nom AS team1_nom,
                    t2.nom AS team2_nom,
                    te.nom AS typeEvent_nom
                FROM 
                    foodball.event e
                JOIN 
                    foodball.team t1 ON e.team1_id = t1.id
                JOIN 
                    foodball.team t2 ON e.team2_id = t2.id
                JOIN 
                    foodball.typeEvent te ON e.typeEvent_id = te.id
            `);
    
            res.json({
                data: rows
            });
        } catch (error) {
            console.log(error);
            res.json({
                state: "error"
            });
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
            const sql = "insert into event (team1_id, team2_id, typeEvent_id ) values (?,?,?)"
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
            const sql = "update event set team1_id = ?, team2_id = ?, typeEvent_id = ?  WHERE id =?"
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