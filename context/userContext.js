import {createContext} from "react";

export const AppContext = createContext();

const UserContext = ({children}) => {
    const myName = "Shamim Sarker";
    const value = {myName};
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default UserContext;