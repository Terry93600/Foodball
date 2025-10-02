// const pool = require("../service/dbConnection")
// const eventController = {

//     // selectAll: async (req,res) => {
//     //     try {
//     //         const [rows, fields] = await pool.query("select * from event")
//     //         res.json({
//     //             data: rows
//     //         })
//     //     } catch (error) {
//     //         console.log(error);
//     //         res.json({
//     //             state:"error"
//     //         })
//     //     }
//     // },
//     selectAll: async (req, res) => {
//         try {
//             const [rows, fields] = await pool.query(`
//                 SELECT
//                     e.id AS event_id,
//                     t1.nom AS team1_nom,
//                     t2.nom AS team2_nom,
//                     te.nom AS typeEvent_nom
//                 FROM
//                     foodball.event e
//                 JOIN
//                     foodball.team t1 ON e.team1_id = t1.id
//                 JOIN
//                     foodball.team t2 ON e.team2_id = t2.id
//                 JOIN
//                     foodball.typeEvent te ON e.typeEvent_id = te.id
//             `);
    
//             res.json({
//                 data: rows
//             });
//         } catch (error) {
//             console.log(error);
//             res.json({
//                 state: "error"
//             });
//         }
//     },
//     selectOne: async (req,res) => {
//         try {
//             const { id } = req.params
//             const [rows, fields] = await pool.query("select * from event WHERE id = ?", [id])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     },
//     create: async (req,res) => {
//         try {
//             const { team1_id, team2_id, typeEvent_id } = req.body
//             const sql = "insert into event (team1_id, team2_id, typeEvent_id ) values (?,?,?)"
//             const [rows, fields] = await pool.query(sql, [team1_id, team2_id, typeEvent_id])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     },
//     update: async (req,res) => {
//         try {
//             const { team1_id, team2_id, typeEvent_id } = req.body
//             const { id } = req .params
//             const sql = "update event set team1_id = ?, team2_id = ?, typeEvent_id = ?  WHERE id =?"
//             const [rows, fields] = await pool.query(sql, [team1_id, team2_id, typeEvent_id, id])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     },
//     delete: async (req,res) => {
//         try {
//             const { id } = req.params
//             const [rows, fields] = await pool.query("delete * from restaurant WHERE id = ?", [id])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

// module.exports = eventController

const Event = require("../models/Event");

const eventController = {
    selectAll: async (req, res) => {
        try {
            const events = await Event.find()
                .populate('team1_id', 'nom')
                .populate('team2_id', 'nom')
                .populate('typeEvent_id', 'nom');
            
            const formattedEvents = events.map(event => ({
                event_id: event._id,
                team1_nom: event.team1_id.nom,
                team2_nom: event.team2_id.nom,
                typeEvent_nom: event.typeEvent_id.nom
            }));

            res.json({
                data: formattedEvents
            });
        } catch (error) {
            console.log(error);
            res.json({
                state: "error"
            });
        }
    },

    selectOne: async (req, res) => {
        try {
            const { id } = req.params;
            const event = await Event.findById(id)
                .populate('team1_id')
                .populate('team2_id')
                .populate('typeEvent_id');
            res.json({
                data: event
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                state: "error"
            });
        }
    },

    create: async (req, res) => {
        try {
            const { team1_id, team2_id, typeEvent_id } = req.body;
            const newEvent = new Event({ team1_id, team2_id, typeEvent_id });
            const savedEvent = await newEvent.save();
            res.json({
                data: savedEvent
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                state: "error"
            });
        }
    },

    update: async (req, res) => {
        try {
            const { team1_id, team2_id, typeEvent_id } = req.body;
            const { id } = req.params;
            const updatedEvent = await Event.findByIdAndUpdate(
                id,
                { team1_id, team2_id, typeEvent_id },
                { new: true }
            );
            res.json({
                data: updatedEvent
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                state: "error"
            });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedEvent = await Event.findByIdAndDelete(id);
            res.json({
                data: deletedEvent
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                state: "error"
            });
        }
    }
};

module.exports = eventController;