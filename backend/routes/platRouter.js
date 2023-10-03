const express = require("express")
const router = express.Router()

const platController = require("../controller/platController")

router.get("/", platController.selectAll)
router.get("/:id", platController.selectOne)
router.post("/", platController.create)
router.put("/:id", platController.update)
router.delete("/:id", platController.delete)

module.exports = router