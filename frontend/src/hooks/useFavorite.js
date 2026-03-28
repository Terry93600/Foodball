import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFavoris = (userId) => {
    const [favoris, setFavoris] = useState([]);

    useEffect(() => {
        if (!userId) return;
        axios.get(`${import.meta.env.VITE_API_URL}favoris/${userId}`)
            .then(res => setFavoris(res.data.data.map(r => r._id)))
            .catch(console.error);
    }, [userId]);

    const toggleFavori = async (restaurantId) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}favoris/toggle/${userId}/${restaurantId}`
            );
            setFavoris(res.data.favoris);
        } catch (error) {
            console.error('Erreur toggle favori:', error);
        }
    };

    const isFavori = (restaurantId) => favoris.includes(restaurantId);

    return { favoris, toggleFavori, isFavori };
};