import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./inscription.css";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Inscription() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  // const [values, setValues] = useState({
  //   nom: "",
  //   prenom: "",
  //   telephone: "",
  //   email: "",
  //   password: "",
  //   role_id: ""
  // });
  // APRÈS ✅
const [values, setValues] = useState({
    nom: "", prenom: "", telephone: "", email: "", password: ""
});
const [selectedRole, setSelectedRole] = useState(null); // null = aucun rôle sélectionné
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    // Effacer l'erreur du champ modifié
    if (errors[event.target.name]) {
      setErrors({ ...errors, [event.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!values.nom.trim()) newErrors.nom = "Le nom est obligatoire";
    if (!values.prenom.trim()) newErrors.prenom = "Le prénom est obligatoire";
    if (!values.telephone.trim()) newErrors.telephone = "Le téléphone est obligatoire";
    if (!values.email.trim()) newErrors.email = "L'email est obligatoire";
    if (!values.password.trim()) newErrors.password = "Le mot de passe est obligatoire";

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (values.email && !emailRegex.test(values.email)) {
      newErrors.email = "Format d'email invalide";
    }

    // Validation téléphone français
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (values.telephone && !phoneRegex.test(values.telephone)) {
      newErrors.telephone = "Format de téléphone français invalide (ex: 06 12 34 56 78)";
    }

    // Validation mot de passe
    if (values.password && values.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    }
    if (values.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(values.password)) {
      newErrors.password = "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedRole) {
      toast.error('Veuillez sélectionner un rôle : Client ou Restaurateur');
      return;
    }

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const endpoint = selectedRole === 'restaurateur'
        ? `${apiUrl}inscription/restaurateur`
        : `${apiUrl}inscription/client`;

      const response = await axios.post(endpoint, values);
      
      if (response.data.state === 'success') {
        const message = selectedRole === 'restaurateur'
          ? 'Inscription réussie ! Votre restaurant a été créé automatiquement.'
          : 'Inscription réussie ! Bienvenue sur Foodball !';
        toast.success(message);
        setTimeout(() => {
          navigate("/connexion");
        }, 2000);
      } else {
        toast.error(response.data.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur inscription:', error);
      
      if (error.response?.data?.errors) {
        // Afficher les erreurs de validation du serveur
        error.response.data.errors.forEach(errorMsg => {
          toast.error(errorMsg);
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Erreur lors de l\'inscription');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="inscription">
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Inscription</h2>
          
          <div className="role-selector">
    <p>Je suis :</p>
    <div className="role-buttons">
        <button
            type="button"
            className={selectedRole === 'client' ? 'active' : ''}
            onClick={() => setSelectedRole('client')}
        >
            👤 Client
        </button>
        <button
            type="button"
            className={selectedRole === 'restaurateur' ? 'active' : ''}
            onClick={() => setSelectedRole('restaurateur')}
        >
            🍽️ Restaurateur
        </button>
    </div>
</div>
          
          <div>
            <label htmlFor="nom">Nom *</label>
            <input
              type="text"
              placeholder="Entrez votre nom"
              name="nom"
              value={values.nom}
              onChange={handleInput}
              className={errors.nom ? 'error' : ''}
            />
            {errors.nom && <span className="error-message">{errors.nom}</span>}
          </div>

          <div>
            <label htmlFor="prenom">Prénom *</label>
            <input
              type="text"
              placeholder="Entrez votre prénom"
              name="prenom"
              value={values.prenom}
              onChange={handleInput}
              className={errors.prenom ? 'error' : ''}
            />
            {errors.prenom && <span className="error-message">{errors.prenom}</span>}
          </div>

          <div>
            <label htmlFor="telephone">Téléphone *</label>
            <input
              type="tel"
              placeholder="Ex: 06 12 34 56 78"
              name="telephone"
              value={values.telephone}
              onChange={handleInput}
              className={errors.telephone ? 'error' : ''}
            />
            {errors.telephone && <span className="error-message">{errors.telephone}</span>}
          </div>

          <div>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              placeholder="Entrez votre email"
              name="email"
              value={values.email}
              onChange={handleInput}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div>
            <label htmlFor="password">Mot de passe *</label>
            <input
              type="password"
              placeholder="Au moins 8 caractères avec majuscule, minuscule et chiffre"
              name="password"
              value={values.password}
              onChange={handleInput}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <ToastContainer />
          
          {!selectedRole && (
            <p className="error-message">⚠️ Veuillez sélectionner un rôle pour vous inscrire</p>
          )}

          <button type="submit" disabled={loading || !selectedRole}>
            {loading ? 'Inscription en cours...' : 'S\'inscrire'}
          </button>
          
          <p>
            Déjà un compte ? <Link to="/connexion">Se connecter</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Inscription;