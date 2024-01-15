const express = require("express")
const router = express.Router()

const typeEventController = require("../controller/typeEvent.controller")

router.get("/", typeEventController.selectAll)
router.get("/:id", typeEventController.selectOne)
router.post("/", typeEventController.create)
router.put("/:id", typeEventController.update)
router.delete("/:id", typeEventController.delete)

module.exports = router