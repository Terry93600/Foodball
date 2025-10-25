import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserProvider';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user } = useUser();

    console.log('🔐 ProtectedRoute - User:', user);
    console.log('🔐 Required Role:', requiredRole);

    // Si pas connecté, rediriger vers la connexion
    if (!user || !user.utilisateur_id || !user.token) {
        console.log('❌ Non connecté - Redirection vers /connexion');
        return <Navigate to="/connexion" replace />;
    }

    // Si un rôle spécifique est requis, vérifier
    if (requiredRole && user.role_nom !== requiredRole) {
        console.log(`❌ Rôle insuffisant (${user.role_nom}) - Redirection vers /`);
        return <Navigate to="/" replace />;
    }

    console.log('✅ Accès autorisé');
    return children;
};

export default ProtectedRoute;