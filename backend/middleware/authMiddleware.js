const authMiddleware = {
    // Middleware pour vérifier si l'utilisateur est admin
    isAdmin: (req, res, next) => {
        // Pour l'instant, on simule avec un header
        // Plus tard, tu pourras utiliser JWT
        const userRole = req.headers['x-user-role'];
        
        console.log('🔐 Vérification admin - Role:', userRole);
        
        if (userRole !== 'admin') {
            return res.status(403).json({
                state: "error",
                message: "Accès refusé. Droits administrateur requis."
            });
        }
        
        next();
    },

    // Middleware pour vérifier si l'utilisateur est connecté
    isAuthenticated: (req, res, next) => {
        const userId = req.headers['x-user-id'];
        
        console.log('🔐 Vérification authentification - User ID:', userId);
        
        if (!userId) {
            return res.status(401).json({
                state: "error",
                message: "Non authentifié. Veuillez vous connecter."
            });
        }
        
        next();
    }
};

module.exports = authMiddleware;