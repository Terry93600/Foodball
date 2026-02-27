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

import ForgotPasswordPage from '../Pages/ForgotPassword';
import ResetPasswordPage from '../Pages/ResetPassword';

import ProtectedRoute from '../src/components/protectedRoute'; // 👈 IMPORTER

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Index />} />

        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />

        {/* 🔒 ROUTE ADMIN PROTÉGÉE */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <ConnectAdmin />
            </ProtectedRoute>
          } 
        />

        {/* 🔒 ROUTES UTILISATEUR PROTÉGÉES */}
        <Route 
          path="/info-restaurant/:critere" 
          element={
            <ProtectedRoute>
              <User_connexion />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/connexion/restaurant_name/ajout_menu" 
          element={
            <ProtectedRoute>
              <Ajout_menu />
            </ProtectedRoute>
          } 
        />

        // Route client protégée ✅
<Route 
  path="/restaurants" 
  element={
    <ProtectedRoute requiredRole="client">
      <Restaurants />
    </ProtectedRoute>
  } 
/>

// Route restaurateur protégée ✅
<Route 
  path="/info-restaurant/:critere" 
  element={
    <ProtectedRoute requiredRole="restaurateur">
      <User_connexion />
    </ProtectedRoute>
  } 
/>

        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/réservation/:critere" element={<Reservation />} />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        
      </Routes>
    </UserProvider>
  );
}

export default App;