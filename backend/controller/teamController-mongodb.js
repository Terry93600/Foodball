// const Team = require("../models/Team");

// const teamController = {
//     selectAll: async (req, res) => {
//         try {
//             const teams = await Team.find();
//             res.json({
//                 data: teams
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
//             const team = await Team.findById(id);
//             res.json({
//                 data: team
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
//             const { nom, logo } = req.body;
//             const newTeam = new Team({ nom, logo });
//             const savedTeam = await newTeam.save();
//             res.json({
//                 data: savedTeam
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
//             const { nom, logo } = req.body;
//             const { id } = req.params;
//             const updatedTeam = await Team.findByIdAndUpdate(
//                 id,
//                 { nom, logo },
//                 { new: true }
//             );
//             res.json({
//                 data: updatedTeam
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
//             const deletedTeam = await Team.findByIdAndDelete(id);
//             res.json({
//                 data: deletedTeam
//             });
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({
//                 state: "error"
//             });
//         }
//     }
// };

// module.exports = teamController;