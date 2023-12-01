import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({children}) => {
    // const [user, setUser] = useState({});

    const [user, setUser] = useState(
        {
            id: 2,
            email: "123@gmail.com",
            name: "123",
            password: "ter",
            role_id: 2,
            role: "restaurateur"
        }
        // {
        //     id: 1,
        //     email: "t@gmail.com",
        //     name: "terry",
        //     password: "ter",
        //     role_id: 1,
        //     role: "admin"
        // }
    );

    return <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
}

export { UserContext, UserProvider }