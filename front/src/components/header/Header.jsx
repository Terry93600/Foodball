import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; 
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import logo from '../../assets/logo/logo-terry.png'

const Header = () => {
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout(); // Appel de la fonction logout pour déconnecter l'utilisateur
  }

  return (
    <nav id='header'>
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" />
      </Link>
      <input type="checkbox" id="menu-toggle"/>
      <label htmlFor="menu-toggle" className="burger">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </label>
      <ul className="nav-links">
        {
          !user?.token ? (
            // Si le token n'est pas présent, afficher le lien "Restaurants"
            <li><Link to="/restaurants">Restaurants</Link></li>
          ) : null
        }
        {
          user?.token ? (
            // Si le token est présent, afficher ces liens
            <>
              <li onClick={handleLogout}><Link to="/connexion">Déconnexion</Link></li>
            </>
          ) : (
            // Si le token n'est pas présent, afficher le lien "Connexion"
            <li><Link to="/connexion">Connexion</Link></li>
          )
        }
      </ul>
    </nav>
  );
};

export default Header;
