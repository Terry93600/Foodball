// import Footer from "../src/components/footer/Footer";
// import Header from "../src/components/header/Header";
// import ListeReservation from "../src/components/réservation/Reservation"


// const Reservation = () => {
//     return <>
//         <Header />
//         <ListeReservation />
//         <Footer/>
//     </>
// }

// export default Reservation;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from "../src/components/footer/Footer";
import Header from "../src/components/header/Header";
import ListeReservation from "../src/components/réservation/Reservation";

const Reservation = () => {
    const { critere } = useParams(); // Récupérer l'ID du restaurant depuis l'URL
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const Url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        console.log('🔍 ID Restaurant:', critere);
        
        // Récupérer les infos du restaurant
        axios.get(`${Url}restaurant/${critere}`)
            .then(response => {
                console.log('🏪 Restaurant récupéré:', response.data);
                setRestaurant(response.data.data);
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
                team1={restaurant.team1?.nom || 'Équipe 1'}
                team2={restaurant.team2?.nom || 'Équipe 2'}
                localisation={restaurant.localisation}
                event={restaurant.typeEvent?.nom || 'Événement'}
                nom={restaurant.nom}
                desc={restaurant.description}
                menu={restaurant.menu}
            />
            <Footer />
        </>
    );
};

export default Reservation;