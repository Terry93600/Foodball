import { Route, Routes } from 'react-router-dom';
import './App.css';
import Index from '../Pages/Index';
import Restaurants from '../Pages/Restaurants';
import Restaurant from '../Pages/Restaurant';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/restaurant" element={<Restaurant />} />
      </Routes>
    </>
  );
}

export default App;