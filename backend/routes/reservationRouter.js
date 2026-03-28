const express = require('express');
const router = express.Router();
const reservationController = require('../controller/reservationController');

router.post('/', reservationController.create);
router.get('/historique/:userId', reservationController.getHistoriqueByUser);
router.get('/avenir/:userId', reservationController.getAVenirByUser);
router.put('/annuler/:id', reservationController.annuler);
router.get('/restaurant/:restaurantId', reservationController.getByRestaurant);

module.exports = router;