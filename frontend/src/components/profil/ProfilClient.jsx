import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserProvider';
import { useNavigate } from 'react-router-dom';

function ProfilClient() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [onglet, setOnglet] = useState('favoris');
    const [favoris, setFavoris] = useState([]);
    const [historique, setHistorique] = useState([]);
    const [avenir, setAvenir] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?._id) return;
        fetchAll();
    }, [user]);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [resFavoris, resHistorique, resAvenir] = await Promise.all([
                axios.get(`${apiUrl}favoris/${user._id}`),
                axios.get(`${apiUrl}reservations/historique/${user._id}`),
                axios.get(`${apiUrl}reservations/avenir/${user._id}`)
            ]);
            setFavoris(resFavoris.data.data || []);
            setHistorique(resHistorique.data.data || []);
            setAvenir(resAvenir.data.data || []);
        } catch (error) {
            toast.error('Erreur lors du chargement');
        } finally {
            setLoading(false);
        }
    };

    const annulerReservation = async (id) => {
        if (!window.confirm('Confirmer l\'annulation ?')) return;
        try {
            await axios.put(`${apiUrl}reservations/annuler/${id}`);
            toast.success('Réservation annulée');
            fetchAll();
        } catch (error) {
            toast.error('Erreur lors de l\'annulation');
        }
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="profil-client">
            <h2>👤 Mon profil — {user.prenom} {user.nom}</h2>

            {/* Onglets */}
            <div className="onglets">
                <button
                    className={onglet === 'favoris' ? 'active' : ''}
                    onClick={() => setOnglet('favoris')}
                >
                    ❤️ Favoris ({favoris.length})
                </button>
                <button
                    className={onglet === 'avenir' ? 'active' : ''}
                    onClick={() => setOnglet('avenir')}
                >
                    📅 À venir ({avenir.length})
                </button>
                <button
                    className={onglet === 'historique' ? 'active' : ''}
                    onClick={() => setOnglet('historique')}
                >
                    📋 Historique ({historique.length})
                </button>
            </div>

            {/* Favoris */}
            {onglet === 'favoris' && (
                <div className="liste-favoris">
                    {favoris.length === 0 ? (
                        <p>Aucun favori pour le moment</p>
                    ) : (
                        favoris.map(restaurant => (
                            <div key={restaurant._id} className="carte-mini"
                                onClick={() => navigate(`/info-restaurant/${restaurant._id}`)}>
                                <h3>{restaurant.nom}</h3>
                                <p>📍 {restaurant.ville}</p>
                                <p>💶 {restaurant.prixMoyen}€ en moyenne</p>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* À venir */}
            {onglet === 'avenir' && (
                <div className="liste-reservations">
                    {avenir.length === 0 ? (
                        <p>Aucune réservation à venir</p>
                    ) : (
                        avenir.map(resa => (
                            <div key={resa._id} className="carte-reservation">
                                <h3>🍽️ {resa.restaurant_id?.nom}</h3>
                                <p>📅 {new Date(resa.date).toLocaleDateString('fr-FR')} à {resa.heure}</p>
                                <p>👥 {resa.nombrePersonnes} personne(s)</p>
                                <button
                                    className="btn-annuler"
                                    onClick={() => annulerReservation(resa._id)}
                                >
                                    ❌ Annuler
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Historique */}
            {onglet === 'historique' && (
                <div className="liste-reservations">
                    {historique.length === 0 ? (
                        <p>Aucune réservation passée</p>
                    ) : (
                        historique.map(resa => (
                            <div key={resa._id} className="carte-reservation passee">
                                <h3>🍽️ {resa.restaurant_id?.nom}</h3>
                                <p>📅 {new Date(resa.date).toLocaleDateString('fr-FR')} à {resa.heure}</p>
                                <p>👥 {resa.nombrePersonnes} personne(s)</p>
                                <button onClick={() => navigate(`/info-restaurant/${resa.restaurant_id?._id}`)}>
                                    👁️ Voir le restaurant
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default ProfilClient;