const footballService = require('../service/footballService');

// Récupérer les matchs d'une compétition
const getMatchesByCompetition = async (req, res) => {
  const { competitionId } = req.params;

  try {
    const matches = await footballService.getMatchesByCompetition(competitionId);
    res.status(200).json({
      success: true,
      data: matches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des matchs.',
    });
  }
};

// Récupérer toutes les compétitions
const getCompetitions = async (req, res) => {
  try {
    const competitions = await footballService.getCompetitions();
    res.status(200).json({
      success: true,
      data: competitions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des compétitions.',
    });
  }
};

module.exports = {
  getMatchesByCompetition,
  getCompetitions,
};