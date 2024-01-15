const express = require("express")
const router = express.Router()

const teamController = require("../controller/teamController")

router.get("/", teamController.selectAll)
router.get("/:id", teamController.selectOne)
router.post("/", teamController.create)
router.put("/:id", teamController.update)
router.delete("/:id", teamController.delete)

module.exports = router