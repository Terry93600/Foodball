import Footer from "../src/components/footer/Footer";
import Header from "../src/components/header/Header";
import Connexion_user_list from "../src/components/connexion-user/infoRestaurant/Connexion_user_list";
import Connexion_user_list_copy from "../src/components/connexion-user copy/infoRestaurant/Connexion_user_list";


const User_connexion = () => {
    return <>
        <Header />
        <Connexion_user_list/>
        {/* <Connexion_user_list_copy/> */}
        <Footer/>
    </>
}

export default User_connexion;