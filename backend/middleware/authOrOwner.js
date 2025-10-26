const jwt = require('jsonwebtoken');

const authOrOwner = (req, res, next) => {
    try {
        // 1️⃣ Récupérer le token
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            console.log('❌ Aucun token fourni');
            return res.status(403).json({ 
                state: 'error', 
                message: 'Accès refusé. Token manquant.' 
            });
        }

        // 2️⃣ Vérifier le token
        const decoded = jwt.verify(token, 'jwtSecretKey');
        console.log('🔓 Token décodé:', decoded);

        // 3️⃣ Ajouter les infos utilisateur à la requête
        req.user = decoded;

        // 4️⃣ Vérifier les droits
        const isAdmin = decoded.role_nom === 'admin';
        const resourceId = req.params.id; // L'ID du restaurant dans l'URL
        const userId = decoded.utilisateur_id;

        console.log('🎭 Rôle:', decoded.role_nom);
        console.log('🆔 User ID:', userId);
        console.log('🏪 Restaurant ID:', resourceId);

        // 5️⃣ Si admin, autoriser
        if (isAdmin) {
            console.log('✅ Admin détecté, accès autorisé');
            return next();
        }

        // 6️⃣ Si restaurateur, vérifier qu'il modifie son propre restaurant
        // On va vérifier ça dans le controller pour avoir accès à la DB
        req.isOwnerCheck = true; // Flag pour le controller
        console.log('⚠️ Restaurateur détecté, vérification de propriété requise');
        next();

    } catch (error) {
        console.error('💥 Erreur authOrOwner:', error);
        return res.status(403).json({ 
            state: 'error', 
            message: 'Token invalide ou expiré' 
        });
    }
};

module.exports = authOrOwner;