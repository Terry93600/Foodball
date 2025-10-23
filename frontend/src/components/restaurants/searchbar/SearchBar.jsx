import "./searchBar.css";
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerms, setSearchTerms] = useState({
    nom: '',
    team: '',
    adresse: '',
    championnat: ''
  });

  const handleInputChange = (field, value) => {
    setSearchTerms(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 🆕 RECHERCHE AVEC TOUS LES CRITÈRES
  const handleSearchClick = () => {
    onSearch(searchTerms);
  };

  // 🆕 RECHERCHE SUR ENTRÉE
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  // 🆕 RESET TOUS LES CHAMPS
  const handleReset = () => {
    const emptyTerms = {
      nom: '',
      team: '',
      adresse: '',
      championnat: ''
    };
    setSearchTerms(emptyTerms);
    onSearch(emptyTerms);
  };

  return (
    <div id="searchBar">
      <div className="search-row">
        <input
          type="text"
          placeholder="🏪 Nom du restaurant..."
          value={searchTerms.nom}
          onChange={(e) => handleInputChange('nom', e.target.value)}
          onKeyPress={handleKeyPress}
        />
        
        <input
          type="text"
          placeholder="⚽ Équipe (ex: PSG, OM)..."
          value={searchTerms.team}
          onChange={(e) => handleInputChange('team', e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      
      <div className="search-row">
        <input
          type="text"
          placeholder="📍 Adresse/Ville..."
          value={searchTerms.adresse}
          onChange={(e) => handleInputChange('adresse', e.target.value)}
          onKeyPress={handleKeyPress}
        />
        
        <input
          type="text"
          placeholder="🏆 Championnat (ex: Ligue 1)..."
          value={searchTerms.championnat}
          onChange={(e) => handleInputChange('championnat', e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      
      <div className="search-buttons">
        <button onClick={handleSearchClick}>🔍 Rechercher</button>
        <button onClick={handleReset}>❌ Effacer tout</button>
      </div>
    </div>
  );
};

export default SearchBar;