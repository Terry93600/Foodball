const express = require('express');
const footballController = require('../controller/footballController');

const router = express.Router();

// Route pour récupérer toutes les compétitions
router.get('/competitions', footballController.getCompetitions);

// Route pour récupérer les matchs d'une compétition
router.get('/matches/:competitionId', footballController.getMatchesByCompetition);

module.exports = router;