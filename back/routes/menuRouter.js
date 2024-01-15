const express = require("express")
const router = express.Router()

const menuController = require("../controller/menuController")

router.get("/", menuController.selectAll)
router.get("/:id", menuController.selectOne)
router.post("/", menuController.create)
router.put("/:id", menuController.update)
router.delete("/:id", menuController.delete)

module.exports = router