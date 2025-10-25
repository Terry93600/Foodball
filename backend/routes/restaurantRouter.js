// // const express = require("express")
// // const router = express.Router()

// // const restaurantController = require("../controller/restaurantController")

// // router.get("/Foodball", restaurantController.selectAllFoodball)
// // router.get("/", restaurantController.selectAll)
// // router.get("/:id", restaurantController.selectOne)
// // router.post("/", restaurantController.create)
// // router.put("/:id", restaurantController.update)
// // router.put("/:id/cloudinary", restaurantController.cloudinary)
// // router.delete("/:id", restaurantController.delete)

// // module.exports = router

// const express = require("express");
// const router = express.Router();

// const restaurantController = require("../controller/restaurantController");

// // GET /api/restaurant - Récupérer tous les restaurants
// router.get("/", restaurantController.selectAll);

// // GET /api/restaurant/:id - Récupérer un restaurant par ID
// router.get("/:id", restaurantController.selectOne);

// // POST /api/restaurant - Créer un nouveau restaurant
// router.post("/", restaurantController.create);

// // PUT /api/restaurant/:id - Mettre à jour un restaurant
// router.put("/:id", restaurantController.update);

// // DELETE /api/restaurant/:id - Supprimer un restaurant
// router.delete("/:id", restaurantController.delete);

// module.exports = router;

const express = require("express");
const router = express.Router();
const restaurantController = require("../controller/restaurantController");
const authMiddleware = require("../middleware/authMiddleware"); // 👈 IMPORTER

// Routes publiques
router.get("/", restaurantController.selectAll);
router.get("/:id", restaurantController.selectOne);

// Routes protégées
router.post("/", authMiddleware.isAuthenticated, restaurantController.create);
router.put("/:id", authMiddleware.isAdmin, restaurantController.update); // 👈 Admin uniquement
router.delete("/:id", authMiddleware.isAdmin, restaurantController.delete); // 👈 Admin uniquement

module.exports = router;