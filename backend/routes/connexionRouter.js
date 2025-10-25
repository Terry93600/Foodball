// const express = require("express")
// const router = express.Router()

// const connexionController = require("../controller/connexionController")

// router.get("/", connexionController.selectAll)
// router.get("/:id", connexionController.selectOne)
// router.post("/", connexionController.create)
// router.put("/:id", connexionController.update)
// router.delete("/:id", connexionController.delete)

// module.exports = router

const express = require("express");
const router = express.Router();

const connexionController = require("../controller/connexionController");

// POST /api/connexion - Login
router.post("/", connexionController.login);
router.put('/toggle-active/:id', connexionController.toggleActive);

module.exports = router;