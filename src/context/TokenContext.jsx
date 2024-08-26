import { createContext, useState } from "react";

export const tokenContext = createContext(TokenContext);

export default function TokenContext({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    
    function newToken(val){
        setToken(val)
        console.log("from token Context" , token)
    }

    return (
        <tokenContext.Provider
            value={{ userToken: token, setUserToken: newToken }}
        >
            {children}
        </tokenContext.Provider>
    );
}
