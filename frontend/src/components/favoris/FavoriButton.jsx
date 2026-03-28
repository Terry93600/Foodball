import React from 'react';

function FavoriButton({ restaurantId, isFavori, onToggle }) {
    return (
        <button
            className={`favori-btn ${isFavori ? 'active' : ''}`}
            onClick={(e) => {
                e.stopPropagation(); // évite de naviguer vers la fiche
                onToggle(restaurantId);
            }}
            title={isFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
            {isFavori ? '❤️' : '🤍'}
        </button>
    );
}

export default FavoriButton;