import { createContext, useState, useContext } from "react";

// Création d'un contexte React appelé UserContext
const UserContext = createContext();

// Création d'un composant UserProvider pour gérer l'état de l'utilisateur
const UserProvider = ({ children }) => {
    // Initialisation de l'état de l'utilisateur à l'aide du hook useState
    const [user, setUser] = useState({
        utilisateur_id: null,
        token: null,
    });

    // Fonction de déconnexion
    const logout = () => {
        setUser(null);
    };

    // Fourniture de l'état de l'utilisateur et de la fonction de déconnexion
    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Un hook personnalisé pour utiliser le contexte de l'utilisateur
const useUser = () => {
    return useContext(UserContext);
};

// Exportation du contexte et du composant pour les utiliser dans d'autres parties de l'application
export { UserContext, UserProvider, useUser };
