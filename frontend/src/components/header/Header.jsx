import { Link } from 'react-router-dom';
import './header.css'; 
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import logo from '../../assets/logo/logo.jpg'

const Header = () => {
  const { user, setUser, logout } = useContext(UserContext);
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
        <li><Link to="/restaurants">Restaurants</Link></li>
        {
          user ? <li onClick={handleLogout}><Link to="/connexion">Déconnexion</Link></li> : <li><Link to="/connexion">Connexion</Link></li> 
        }
      </ul>
    </nav>
  );
};

export default Header;
