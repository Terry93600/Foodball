const express = require("express")
const router = express.Router()

const inscriptionController = require("../controller/inscriptionController")

router.get("/", inscriptionController.selectAll)
router.get("/:id", inscriptionController.selectOne)
router.post("/", inscriptionController.create)
router.put("/:id", inscriptionController.update)
router.delete("/:id", inscriptionController.delete)

module.exports = router