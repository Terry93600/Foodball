import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    // Récupérer l'utilisateur depuis localStorage au démarrage
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : {
            utilisateur_id: null,
            token: null,
            role_nom: null,
        };
    });

    // Sauvegarder l'utilisateur dans localStorage à chaque changement
    useEffect(() => {
        if (user && user.utilisateur_id) {
            localStorage.setItem('user', JSON.stringify(user));
            console.log('💾 User sauvegardé:', user);
        } else {
            localStorage.removeItem('user');
            console.log('🗑️ User supprimé du localStorage');
        }
    }, [user]);

    // Fonction de déconnexion
    const logout = () => {
        setUser({
            utilisateur_id: null,
            token: null,
            role_nom: null,
        });
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    return useContext(UserContext);
};

export { UserContext, UserProvider, useUser };