// import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './header.css'; 
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import logo from '../../assets/logo/logo.jpg'

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  
  return (
    
<nav id='header'>
      {/* { user.id } */}
      <Link to="/" className="logo">
        <img src={logo} />
      </Link>
    <input type="checkbox" id="menu-toggle"/>
    <label htmlFor="menu-toggle" className="burger">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
    </label>
    <ul className="nav-links">
        <li><Link to="/restaurants">Restaurants</Link></li>
        {/* <li><Link to={`/infos-restaurant/${user.id}`}>Infos</Link></li> */}
        {/* <li><Link to={`/connexion`}>Connexion</Link></li> */}
         {
          user ? <li><Link to="/deconnexion">Déconnexion</Link></li> : <li><Link to="/connexion">Connexion</Link></li> 
        }
    </ul>
</nav>

  );
};

export default Header;
