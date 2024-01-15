const express = require("express")
const router = express.Router()

const restaurantEventcontroller = require("../controller/restaurantEventController")

router.get("/", restaurantEventcontroller.selectAll)
router.get("/:id", restaurantEventcontroller.selectOne)
router.post("/", restaurantEventcontroller.create)
router.put("/:id", restaurantEventcontroller.update)
router.delete("/:id", restaurantEventcontroller.delete)

module.exports = router