import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    // const [user, setUser] = useState(
    //     {
    //         id: 2,
    //         email: "123@gmail.com",
    //         name: "123",
    //         password: "ter",
    //         role_id: 2,
    //         role: "restaurateur"
    //     }
    // );
    

    return <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
}

export { UserContext, UserProvider }