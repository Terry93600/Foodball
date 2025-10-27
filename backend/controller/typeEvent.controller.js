const TypeEvent = require("../models/TypeEvent");

const typeEventController = {
    selectAll: async (req, res) => {
        try {
            const typeEvents = await TypeEvent.find();
            res.json({
                data: typeEvents
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
            const typeEvent = await TypeEvent.findById(id);
            res.json({
                data: typeEvent
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
            const { nom } = req.body;
            const newTypeEvent = new TypeEvent({ nom });
            const savedTypeEvent = await newTypeEvent.save();
            res.json({
                data: savedTypeEvent
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
            const { nom } = req.body;
            const { id } = req.params;
            const updatedTypeEvent = await TypeEvent.findByIdAndUpdate(
                id,
                { nom },
                { new: true }
            );
            res.json({
                data: updatedTypeEvent
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
            const deletedTypeEvent = await TypeEvent.findByIdAndDelete(id);
            res.json({
                data: deletedTypeEvent
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                state: "error"
            });
        }
    }
};

module.exports = typeEventController;