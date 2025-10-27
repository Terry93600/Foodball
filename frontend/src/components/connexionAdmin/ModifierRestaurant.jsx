import React, { useState, useEffect } from "react";
import "./ModifierRestaurant.css";
import apiClient from "../../../service/apiClient";

const ModifierRestaurant = ({ restaurant, onClose, onUpdate }) => {
  const Url = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    localisation: "",
    codePostal: "",
    ville: "",
    telephone: "",
    email: "",
    capacite: "",
    prixMoyen: "",
    menu: "",
  });

  useEffect(() => {
    if (restaurant) {
      console.log('Restaurant reçu dans le modal:', restaurant); // 👈 DEBUG
      setFormData({
        nom: restaurant.nom || "",
        description: restaurant.description || "",
        localisation: restaurant.localisation || "",
        codePostal: restaurant.codePostal || "",
        ville: restaurant.ville || "",
        telephone: restaurant.telephone || "",
        email: restaurant.email || "",
        capacite: restaurant.capacite || "",
        prixMoyen: restaurant.prixMoyen || "",
        menu: restaurant.menu || "",
      });
    }
  }, [restaurant]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
    const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await apiClient.put(`restaurant/${restaurant._id}`, formData);
      
      if (response.data.data) {
        alert("Restaurant modifié avec succès !");
        onUpdate();
        onClose();
      }
    } catch (error) {
      console.error("Erreur:", error);
      if (error.response?.status === 403) {
        alert("Accès refusé. Vous n'avez pas les droits administrateur.");
      } else {
        alert("Erreur lors de la modification");
      }
    }
  };
    
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Modifier le Restaurant</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Localisation</label>
            <input
              type="text"
              name="localisation"
              value={formData.localisation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Code Postal</label>
            <input
              type="text"
              name="codePostal"
              value={formData.codePostal}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Ville</label>
            <input
              type="text"
              name="ville"
              value={formData.ville}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Téléphone</label>
            <input
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Capacité</label>
            <input
              type="number"
              name="capacite"
              value={formData.capacite}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Prix Moyen (€)</label>
            <input
              type="number"
              name="prixMoyen"
              value={formData.prixMoyen}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Menu (URL)</label>
            <input
              type="text"
              name="menu"
              value={formData.menu}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save">Enregistrer</button>
            <button type="button" onClick={onClose} className="btn-cancel">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifierRestaurant;