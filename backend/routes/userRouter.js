const express = require("express")
const router = express.Router()

const userController = require("../controller/userController")

router.get("/", userController.selectAll)
router.get("/:id", userController.selectOne)
router.post("/", userController.create)
router.put("/:id", userController.update)
router.delete("/:id", userController.delete)

module.exports = router