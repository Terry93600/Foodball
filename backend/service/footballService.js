const axios = require('axios');

// Configuration de l'API
const API_KEY = process.env.FOOTBALL_API_KEY;
const BASE_URL = 'https://api.football-data.org/v4';
const HEADERS = { 'X-Auth-Token': API_KEY };

// Fonction pour récupérer les matchs d'une compétition
const getMatchesByCompetition = async (competitionId) => {
  try {
    const response = await axios.get(`${BASE_URL}/competitions/${competitionId}/matches`, {
      headers: HEADERS,
    });
    return response.data.matches; // Retourne les matchs
  } catch (error) {
    console.error('Erreur lors de la récupération des matchs :', error.message);
    throw error;
  }
};

// Fonction pour récupérer toutes les compétitions
const getCompetitions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/competitions`, { headers: HEADERS });
    return response.data.competitions; // Retourne les compétitions
  } catch (error) {
    console.error('Erreur lors de la récupération des compétitions :', error.message);
    throw error;
  }
};

module.exports = {
  getMatchesByCompetition,
  getCompetitions,
};