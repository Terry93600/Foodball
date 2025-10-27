const jwt = require('jsonwebtoken');

const authMiddleware = {
    // Middleware pour vérifier si l'utilisateur est admin
    isAdmin: (req, res, next) => {
        try {
            // 1️⃣ Récupérer le token depuis le header Authorization
            const authHeader = req.headers.authorization;
            
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                console.log('❌ Token manquant');
                return res.status(401).json({
                    state: "error",
                    message: "Token manquant. Veuillez vous connecter."
                });
            }

            const token = authHeader.split(' ')[1];
            
            // 2️⃣ Vérifier et décoder le token
            const decoded = jwt.verify(token, 'jwtSecretKey'); // 👈 Utilise la même clé que dans authOrOwner
            
            console.log('🔐 Vérification admin - Token décodé:', decoded);
            console.log('🎭 Rôle:', decoded.role_nom);
            
            // 3️⃣ Vérifier si l'utilisateur est admin
            if (decoded.role_nom !== 'admin') {
                console.log('❌ Accès refusé - Rôle:', decoded.role_nom);
                return res.status(403).json({
                    state: "error",
                    message: "Accès refusé. Droits administrateur requis."
                });
            }
            
            // 4️⃣ Ajouter les infos utilisateur à la requête
            req.user = decoded;
            
            console.log('✅ Admin vérifié');
            next();
            
        } catch (error) {
            console.error('💥 Erreur vérification admin:', error);
            return res.status(401).json({
                state: "error",
                message: "Token invalide ou expiré."
            });
        }
    },

    // Middleware pour vérifier si l'utilisateur est connecté
    isAuthenticated: (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                console.log('❌ Token manquant');
                return res.status(401).json({
                    state: "error",
                    message: "Non authentifié. Veuillez vous connecter."
                });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, 'jwtSecretKey');
            
            console.log('🔐 Vérification authentification - User:', decoded.email);
            
            req.user = decoded;
            next();
            
        } catch (error) {
            console.error('💥 Erreur authentification:', error);
            return res.status(401).json({
                state: "error",
                message: "Token invalide ou expiré."
            });
        }
    }
};

module.exports = authMiddleware;