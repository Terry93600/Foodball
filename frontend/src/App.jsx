import { Route, Routes } from 'react-router-dom';
import './App.css';
import Index from '../Pages/Index';
import Restaurants from '../Pages/Restaurants';
import Restaurant from '../Pages/Restaurant';
import Reservation from '../Pages/Reservation';
import Connexion from '../Pages/Connexion';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/restaurant" element={<Restaurant />} />
        <Route path="/restaurants/restaurant/réservation" element={<Reservation />} />
      </Routes>
    </>
  );
}

export default App;