import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './header.css'; 
import logo from '../../assets/logo/logo.png'


const Header = () => {

  return (
    
<nav id='header'>
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
        <li><Link to="/restaurants">Restaurant</Link></li>
        <li><Link to="/restaurants">Date Importante</Link></li>
        <li><Link to="/restaurants">Connexion</Link></li>
    </ul>
</nav>
    
  );
};

export default Header;
