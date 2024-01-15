const express = require("express")
const router = express.Router()

const roleController = require("../controller/role.controller")

router.get("/", roleController.selectAll)
router.get("/:id", roleController.selectOne)
router.post("/", roleController.create)
router.put("/:id", roleController.update)
router.delete("/:id", roleController.delete)

module.exports = router