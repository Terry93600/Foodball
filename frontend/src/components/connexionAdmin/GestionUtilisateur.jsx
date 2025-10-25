import React, { useEffect, useState } from "react";
import "./GestionUtilisateurs.css";

const GestionUtilisateurs = () => {
  const Url = import.meta.env.VITE_API_URL;
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const fetchUtilisateurs = async () => {
    try {
      const response = await fetch(`${Url}connexion`);
      const data = await response.json();
      setUtilisateurs(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Erreur:", error);
      setLoading(false);
    }
  };

  const toggleActive = async (id) => {
    try {
      const response = await fetch(`${Url}connexion/toggle-active/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      
      if (data.state === "success") {
        alert(data.message);
        fetchUtilisateurs(); // Recharger la liste
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la modification");
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="gestion-utilisateurs">
      <h2>Gestion des Utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map((user) => (
            <tr key={user._id} className={!user.isActive ? "blocked" : ""}>
              <td>{user.nom}</td>
              <td>{user.prenom}</td>
              <td>{user.email}</td>
              <td>{user.telephone}</td>
              <td>{user.role_id?.nom || "N/A"}</td>
              <td>
                <span className={`status ${user.isActive ? "active" : "inactive"}`}>
                  {user.isActive ? "✅ Actif" : "🚫 Bloqué"}
                </span>
              </td>
              <td>
                <button
                  onClick={() => toggleActive(user._id)}
                  className={user.isActive ? "btn-block" : "btn-unblock"}
                >
                  {user.isActive ? "Bloquer" : "Débloquer"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionUtilisateurs;