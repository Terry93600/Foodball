const express = require("express")
const router = express.Router()

const eventcontroller = require("../controller/eventController")

router.get("/", eventcontroller.selectAll)
router.get("/:id", eventcontroller.selectOne)
router.post("/", eventcontroller.create)
router.put("/:id", eventcontroller.update)
router.delete("/:id", eventcontroller.delete)

module.exports = router