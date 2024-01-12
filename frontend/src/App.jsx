import { Route, Routes } from 'react-router-dom';
import './App.css';

import Index from '../Pages/Index';
import Restaurants from '../Pages/Restaurants';
import ConnectAdmin from '../Pages/ConnexionAdmin';
import Reservation from '../Pages/Reservation';

import Connexion from '../Pages/Connexion';
import Inscription from '../Pages/Inscription';

import User_connexion from '../Pages/Connexion_user';
import Ajout_menu from '../Pages/Ajout_menu';
import { UserProvider } from './context/UserProvider';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Index />} />

        <Route path="/connexion" element={<Connexion />} />
        <Route path="/admin" element={<ConnectAdmin />} />
        <Route path="/inscription" element={<Inscription />} />

        {/* <Route path="/connexion/:critere" element={<User_connexion />} /> */}
        <Route path="/info-restaurant/:critere" element={<User_connexion />} />
        <Route path="/connexion/restaurant_name/ajout_menu" element={<Ajout_menu />} />

        <Route path="/restaurants" element={<Restaurants />} />

        {/* <Route path="/restaurants/réservation" element={<Reservation />} /> */}
        <Route path="/réservation/:critere" element={<Reservation />} />
        
      </Routes>
    </UserProvider>
  );
}

export default App;