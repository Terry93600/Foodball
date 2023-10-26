// import "./searchBar.css";
// import React, { useState } from 'react';

// const SearchBar = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = () => {
//     onSearch(searchTerm);
//   };

//   return (
//     <div id="searchBar">
//       <input
//         type="text"
//         placeholder="Chercher votre but "
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <button onClick={handleSearch}>Rechercher</button>
//     </div>
//   );
// };

// export default SearchBar;


import "./searchBar.css";
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Cette fonction sera appelée à chaque modification du champ de recherche
  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    
    // Vous pouvez également appeler la fonction de recherche ici si vous le souhaitez
    onSearch(newSearchTerm);
  };

  return (
    <div id="searchBar">
      <input
        type="text"
        placeholder="Chercher votre but"
        value={searchTerm}
        onChange={handleSearchChange} // Gère les modifications de l'entrée
      />
      {/* Notez que le bouton "Rechercher" n'est plus nécessaire pour la recherche en temps réel */}
    </div>
  );
};

export default SearchBar;
