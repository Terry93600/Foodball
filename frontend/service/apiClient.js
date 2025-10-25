import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Intercepteur pour ajouter automatiquement les headers
apiClient.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (user.utilisateur_id) {
        config.headers['x-user-id'] = user.utilisateur_id;
    }
    
    if (user.role_nom) {
        config.headers['x-user-role'] = user.role_nom;
    }
    
    console.log('📤 Requête API avec headers:', config.headers);
    
    return config;
});

export default apiClient;