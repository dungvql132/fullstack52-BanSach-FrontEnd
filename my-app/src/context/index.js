import React, { useState } from "react";
import API from "../callAPI";

const MainContext = React.createContext();

const MainApp = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    React.useEffect(async () => {
        let result = await API.Login.getCurrentUser();
        if (result.status == 200) {
            setIsLogin(true);
        }
    }, [])
    return (
        <MainContext.Provider
            value={{
                isLogin,
                setIsLogin,
                async getCurrentUser() {
                    return await API.Login.getCurrentUser();
                }
            }}
        >
            {children}
        </MainContext.Provider>
    )
}

export {
    MainContext,
    MainApp
}