const express = require("express");
const router = express.Router();
const restaurantController = require("../controller/restaurantController");
const authMiddleware = require("../middleware/authMiddleware"); // 👈 IMPORTER
const authOrOwner = require('../middleware/authOrOwner');

// Routes publiques
router.get("/", restaurantController.selectAll);
router.get("/:id", restaurantController.selectOne);

// Routes protégées
router.post("/", authMiddleware.isAuthenticated, restaurantController.create);
// router.put("/:id", authMiddleware.isAdmin, restaurantController.update); // 👈 Admin uniquement
router.put('/:id', authOrOwner, restaurantController.update);
router.delete("/:id", authMiddleware.isAdmin, restaurantController.delete); // 👈 Admin uniquement

module.exports = router;