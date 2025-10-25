import React, { useEffect, useState } from "react";
import "./GestionEquipesEvenements.css";

const GestionEquipesEvenements = () => {
  const Url = import.meta.env.VITE_API_URL;
  const [teams, setTeams] = useState([]);
  const [typeEvents, setTypeEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("teams");
  
  // États pour les formulaires
  const [newTeam, setNewTeam] = useState({ nom: "", logo: "" });
  const [newEvent, setNewEvent] = useState({ nom: "" });
  const [editingTeam, setEditingTeam] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchTeams();
    fetchTypeEvents();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${Url}team`);
      const data = await response.json();
      setTeams(data.data || []);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const fetchTypeEvents = async () => {
    try {
      const response = await fetch(`${Url}typeevent`);
      const data = await response.json();
      setTypeEvents(data.data || []);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // CRUD TEAMS
  const createTeam = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${Url}team`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeam),
      });
      const data = await response.json();
      if (data.data) {
        alert("Équipe créée !");
        setNewTeam({ nom: "", logo: "" });
        fetchTeams();
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const updateTeam = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${Url}team/${editingTeam._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTeam),
      });
      const data = await response.json();
      if (data.data) {
        alert("Équipe modifiée !");
        setEditingTeam(null);
        fetchTeams();
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const deleteTeam = async (id) => {
    if (!confirm("Supprimer cette équipe ?")) return;
    try {
      await fetch(`${Url}team/${id}`, { method: "DELETE" });
      alert("Équipe supprimée !");
      fetchTeams();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // CRUD TYPE EVENTS
  const createEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${Url}typeevent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      const data = await response.json();
      if (data.data) {
        alert("Type d'événement créé !");
        setNewEvent({ nom: "" });
        fetchTypeEvents();
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const updateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${Url}typeevent/${editingEvent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingEvent),
      });
      const data = await response.json();
      if (data.data) {
        alert("Type d'événement modifié !");
        setEditingEvent(null);
        fetchTypeEvents();
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const deleteEvent = async (id) => {
    if (!confirm("Supprimer ce type d'événement ?")) return;
    try {
      await fetch(`${Url}typeevent/${id}`, { method: "DELETE" });
      alert("Type d'événement supprimé !");
      fetchTypeEvents();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="gestion-container">
      <h2>Gestion Équipes & Événements</h2>
      
      <div className="tabs">
        <button 
          className={activeTab === "teams" ? "active" : ""} 
          onClick={() => setActiveTab("teams")}
        >
          ⚽ Équipes
        </button>
        <button 
          className={activeTab === "events" ? "active" : ""} 
          onClick={() => setActiveTab("events")}
        >
          🎉 Types d'Événements
        </button>
      </div>

      {activeTab === "teams" && (
        <div className="section">
          <h3>Créer une Équipe</h3>
          <form onSubmit={createTeam} className="create-form">
            <input
              type="text"
              placeholder="Nom de l'équipe"
              value={newTeam.nom}
              onChange={(e) => setNewTeam({ ...newTeam, nom: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="URL du logo"
              value={newTeam.logo}
              onChange={(e) => setNewTeam({ ...newTeam, logo: e.target.value })}
            />
            <button type="submit">Créer</button>
          </form>

          <h3>Liste des Équipes</h3>
          <div className="list">
            {teams.map((team) => (
              <div key={team._id} className="item">
                {editingTeam?._id === team._id ? (
                  <form onSubmit={updateTeam} className="edit-form">
                    <input
                      type="text"
                      value={editingTeam.nom}
                      onChange={(e) => setEditingTeam({ ...editingTeam, nom: e.target.value })}
                    />
                    <input
                      type="text"
                      value={editingTeam.logo}
                      onChange={(e) => setEditingTeam({ ...editingTeam, logo: e.target.value })}
                    />
                    <button type="submit">✅</button>
                    <button type="button" onClick={() => setEditingTeam(null)}>❌</button>
                  </form>
                ) : (
                  <>
                    <div className="item-info">
                      {team.logo && <img src={team.logo} alt={team.nom} />}
                      <span>{team.nom}</span>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => setEditingTeam(team)}>✏️ Modifier</button>
                      <button onClick={() => deleteTeam(team._id)} className="delete">🗑️ Supprimer</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "events" && (
        <div className="section">
          <h3>Créer un Type d'Événement</h3>
          <form onSubmit={createEvent} className="create-form">
            <input
              type="text"
              placeholder="Nom du type d'événement"
              value={newEvent.nom}
              onChange={(e) => setNewEvent({ nom: e.target.value })}
              required
            />
            <button type="submit">Créer</button>
          </form>

          <h3>Liste des Types d'Événements</h3>
          <div className="list">
            {typeEvents.map((event) => (
              <div key={event._id} className="item">
                {editingEvent?._id === event._id ? (
                  <form onSubmit={updateEvent} className="edit-form">
                    <input
                      type="text"
                      value={editingEvent.nom}
                      onChange={(e) => setEditingEvent({ ...editingEvent, nom: e.target.value })}
                    />
                    <button type="submit">✅</button>
                    <button type="button" onClick={() => setEditingEvent(null)}>❌</button>
                  </form>
                ) : (
                  <>
                    <div className="item-info">
                      <span>{event.nom}</span>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => setEditingEvent(event)}>✏️ Modifier</button>
                      <button onClick={() => deleteEvent(event._id)} className="delete">🗑️ Supprimer</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionEquipesEvenements;