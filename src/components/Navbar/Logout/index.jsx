import React from 'react'
import { useNavigate } from "react-router-dom";
import CookiesStorageService from '../../../services/CookiesStorageService';

const StorageService = CookiesStorageService.getService()

const Logout = () => {
    let navigate = useNavigate()

    const logout = () => {
        StorageService.clearToken();
        navigate('/Login');
    }

    return (
        <button className="nav-link" aria-current="page" onClick={() => logout()}>
            Logout
        </button>
    )
}

export default Logout
