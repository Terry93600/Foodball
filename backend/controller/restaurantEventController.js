const Restaurant = require("../models/Restaurant");
const Event = require("../models/Event");

const restaurantEventController = {
  selectAll: async (req, res) => {
    try {
      // Récupérer tous les restaurants avec leurs événements
      const restaurants = await Restaurant.find()
        .populate('team1', 'nom')
        .populate('team2', 'nom')
        .populate('typeEvent', 'nom')
        .populate('utilisateur_id', 'nom prenom email');
      
      res.json({
        data: restaurants
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error"
      });
    }
  },

  selectOne: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Récupérer un restaurant spécifique avec ses événements
      const restaurant = await Restaurant.findById(id)
        .populate('team1', 'nom logo')
        .populate('team2', 'nom logo')
        .populate('typeEvent', 'nom')
        .populate('utilisateur_id', 'nom prenom email');
      
      if (!restaurant) {
        return res.status(404).json({
          error: "Restaurant non trouvé"
        });
      }
      
      res.json({
        data: restaurant
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error"
      });
    }
  },

  create: async (req, res) => {
    try {
      const { restaurant_id, event_id } = req.body;
      
      // Vérifier que le restaurant et l'événement existent
      const restaurant = await Restaurant.findById(restaurant_id);
      const event = await Event.findById(event_id);
      
      if (!restaurant) {
        return res.status(404).json({
          error: "Restaurant non trouvé"
        });
      }
      
      if (!event) {
        return res.status(404).json({
          error: "Événement non trouvé"
        });
      }
      
      // Mettre à jour le restaurant avec l'événement
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        restaurant_id,
        {
          team1: event.team1,
          team2: event.team2,
          typeEvent: event.typeEvent
        },
        { new: true }
      ).populate('team1 team2 typeEvent');
      
      res.json({
        Status: "Success",
        message: "Événement associé au restaurant avec succès",
        data: updatedRestaurant
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error"
      });
    }
  },

  update: async (req, res) => {
    try {
      const { restaurant_id, event_id } = req.body;
      const { id } = req.params; // ID du restaurant
      
      console.log('🔄 Mise à jour restaurant-event:', { restaurant_id, event_id, id });
      
      // Vérifier que l'événement existe
      const event = await Event.findById(event_id);
      if (!event) {
        return res.status(404).json({
          error: "Événement non trouvé"
        });
      }
      
      // Mettre à jour le restaurant avec le nouvel événement
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        id, // Utiliser l'ID du restaurant depuis les params
        {
          team1: event.team1,
          team2: event.team2,
          typeEvent: event.typeEvent
        },
        { new: true }
      ).populate('team1 team2 typeEvent utilisateur_id');
      
      if (!updatedRestaurant) {
        return res.status(404).json({
          error: "Restaurant non trouvé"
        });
      }
      
      console.log('✅ Restaurant mis à jour:', updatedRestaurant._id);
      
      res.json({
        Status: "Success",
        message: "Événement mis à jour avec succès",
        data: updatedRestaurant
      });
    } catch (error) {
      console.error('❌ Erreur mise à jour restaurant-event:', error);
      res.status(500).json({
        error: "Internal Server Error",
        message: error.message
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params; // ID du restaurant
      
      // Supprimer les associations d'événements du restaurant
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        id,
        {
          team1: null,
          team2: null,
          typeEvent: null
        },
        { new: true }
      );
      
      if (!updatedRestaurant) {
        return res.status(404).json({
          error: "Restaurant non trouvé"
        });
      }
      
      res.json({
        Status: "Success",
        message: "Associations d'événements supprimées",
        data: updatedRestaurant
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error"
      });
    }
  }
};

module.exports = restaurantEventController;