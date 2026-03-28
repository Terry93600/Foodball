const express = require('express');
const router = express.Router();
const favoriController = require('../controller/favoriController');

router.post('/toggle/:userId/:restaurantId', favoriController.toggle);
router.get('/:userId', favoriController.getByUser);

module.exports = router;