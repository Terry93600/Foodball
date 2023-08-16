import { Route, Routes } from 'react-router-dom';
import './App.css';
import Index from '../Pages/Index';
import Restaurants from '../Pages/Restaurants';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/restaurants" element={<Restaurants />} />
      </Routes>
    </>
  );
}

export default App;