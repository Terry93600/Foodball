const express = require("express");
const router = express.Router();

const connexionController = require("../controller/connexionController");

// POST /api/connexion - Login
router.post("/", connexionController.login);
router.put('/toggle-active/:id', connexionController.toggleActive);

module.exports = router;