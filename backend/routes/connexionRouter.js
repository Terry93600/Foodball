const express = require("express")
const router = express.Router()

const connexionController = require("../controller/connexionController")

router.get("/", connexionController.selectAll)
router.get("/:id", connexionController.selectOne)
router.post("/", connexionController.create)
router.put("/:id", connexionController.update)
router.delete("/:id", connexionController.delete)

module.exports = router