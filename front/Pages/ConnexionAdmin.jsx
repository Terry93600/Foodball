import Header from "../src/components/header/Header";
import Login from "../src/components/connexion/Connexion"
import ListeRestaurant from "../src/components/connexionAdmin/ListeRestaurants";


const ConnectAdmin = () => {
    return <>
        <Header />
        {/* <Login /> */}
        <ListeRestaurant/>
        {/* <ConnectAdmin/> */}
    </>
}

export default ConnectAdmin;