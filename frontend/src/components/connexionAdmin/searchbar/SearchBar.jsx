import "./searchBar.css";
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    
    onSearch(newSearchTerm);
  };

  return (
    <div id="searchBar">
      <input
        type="text"
        placeholder="Chercher votre but"
        value={searchTerm}
        onChange={handleSearchChange} 
      />
    </div>
  );
};

export default SearchBar;
