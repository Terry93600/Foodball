import Footer from "../src/components/footer/Footer";
import Header from "../src/components/header/Header";
import Connexion_user_list from "../src/components/connexion-user/infoRestaurant/Connexion_user_list";
import UploadImage from "../src/components/restaurant/UploadImage";


const User_connexion = () => {
    return <>
        <Header />
        <Connexion_user_list/>
        <UploadImage/>
        <Footer/>
    </>
}

export default User_connexion;