import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from "../src/components/footer/Footer";
import Header from "../src/components/header/Header";
import ListeReservation from "../src/components/réservation/Reservation";

const Reservation = () => {
    const { critere } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const Url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        console.log('🔍 ID Restaurant:', critere);
        
        axios.get(`${Url}restaurant/${critere}`)
            .then(response => {
                console.log('🏪 Restaurant récupéré:', response.data);
                
                // 👇 AJOUTER CE LOG POUR VOIR LA STRUCTURE
                console.log('📦 Structure data:', response.data.data);
                
                // ✅ Adapter selon la structure de ta réponse
                const restaurantData = response.data.data || response.data;
                
                console.log('🔍 Team1:', restaurantData.team1);
                console.log('🔍 Team2:', restaurantData.team2);
                console.log('🔍 TypeEvent:', restaurantData.typeEvent);
                
                setRestaurant(restaurantData);
                setLoading(false);
            })
            .catch(error => {
                console.error('❌ Erreur récupération restaurant:', error);
                setLoading(false);
            });
    }, [critere, Url]);

    if (loading) {
        return (
            <>
                <Header />
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <h2>Chargement...</h2>
                </div>
                <Footer />
            </>
        );
    }

    if (!restaurant) {
        return (
            <>
                <Header />
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <h2>Restaurant non trouvé</h2>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <ListeReservation
                email={restaurant.email}
                team1={restaurant.team1?.nom || restaurant.team1 || 'Équipe 1'}
                team2={restaurant.team2?.nom || restaurant.team2 || 'Équipe 2'}
                localisation={restaurant.localisation}
                event={restaurant.typeEvent?.nom || restaurant.typeEvent || 'Événement'}
                nom={restaurant.nom}
                desc={restaurant.description}
                menu={restaurant.menu}
            />
            <Footer />
        </>
    );
};

export default Reservation;