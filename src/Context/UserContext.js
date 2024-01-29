import axios from "axios";
import React, { createContext, useState } from "react";
import CookiesStorageService from "../services/CookiesStorageService";

const StorageService = CookiesStorageService.getService()

const userContext = createContext({});

const UserContextProvider = ({ children }) => {
    const [isUserAuth, setIsUserAuth] = useState(false)
    const [error, seterror] = useState(null);
    const [isloading, setLoading] = useState(false);

    React.useEffect(() => {
        if (!!StorageService.getAccessToken()) {
            setIsUserAuth(true)
        }
    }, [])

    const LoginSubmit = (values) => {
        setLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
            .then((result) => {
                setIsUserAuth(true)
                StorageService.setToken(result?.data?.token).then(() => {
                    setLoading(false)
                })
            })
            .catch((error) => {
                setLoading(false)
                seterror(error?.response?.data?.message)
            })
    }

    const logout = () => {
        setLoading(true)
        setTimeout(() => {
            StorageService.clearToken();
            setIsUserAuth(false)
            setLoading(false)
        }, 2000)
    }

    return (
        <userContext.Provider value={{
            LoginSubmit,
            logout,
            error,
            isloading,
            isUserAuth
        }}>
            {children}
        </userContext.Provider>
    )
}

export { UserContextProvider, userContext }
