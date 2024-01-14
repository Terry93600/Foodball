import { createContext, useState, useContext } from "react";
const UserContext = createContext();
const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        utilisateur_id: null,
        token: null,
    });

    // Fonction de déconnexion
    const logout = () => {
        setUser(null);
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
