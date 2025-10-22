// const Event = require("../models/Event");

// const eventController = {
//     selectAll: async (req, res) => {
//         try {
//             const events = await Event.find()
//                 .populate('team1_id', 'nom')
//                 .populate('team2_id', 'nom')
//                 .populate('typeEvent_id', 'nom');
            
//             // Transformer les données pour correspondre au format attendu
//             const formattedEvents = events.map(event => ({
//                 event_id: event._id,
//                 team1_nom: event.team1_id.nom,
//                 team2_nom: event.team2_id.nom,
//                 typeEvent_nom: event.typeEvent_id.nom
//             }));

//             res.json({
//                 data: formattedEvents
//             });
//         } catch (error) {
//             console.log(error);
//             res.json({
//                 state: "error"
//             });
//         }
//     },

//     selectOne: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const event = await Event.findById(id)
//                 .populate('team1_id')
//                 .populate('team2_id')
//                 .populate('typeEvent_id');
//             res.json({
//                 data: event
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({
//                 state: "error"
//             });
//         }
//     },

//     create: async (req, res) => {
//         try {
//             const { team1_id, team2_id, typeEvent_id } = req.body;
//             const newEvent = new Event({ team1_id, team2_id, typeEvent_id });
//             const savedEvent = await newEvent.save();
//             res.json({
//                 data: savedEvent
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({
//                 state: "error"
//             });
//         }
//     },

//     update: async (req, res) => {
//         try {
//             const { team1_id, team2_id, typeEvent_id } = req.body;
//             const { id } = req.params;
//             const updatedEvent = await Event.findByIdAndUpdate(
//                 id,
//                 { team1_id, team2_id, typeEvent_id },
//                 { new: true }
//             );
//             res.json({
//                 data: updatedEvent
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({
//                 state: "error"
//             });
//         }
//     },

//     delete: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const deletedEvent = await Event.findByIdAndDelete(id);
//             res.json({
//                 data: deletedEvent
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({
//                 state: "error"
//             });
//         }
//     }
// };

// module.exports = eventController;