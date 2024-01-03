import Connexion_user_list from "../src/components/connexion-user copy/infoRestaurant/Connexion_user_list";
import Footer from "../src/components/footer/Footer";
import Header from "../src/components/header/Header";
import ListeReservation from "../src/components/réservation/ListeReservation"


const Reservation = () => {
    return <>
        <Header />
        <ListeReservation />
        <Connexion_user_list />
        <Footer/>
    </>
}

export default Reservation;