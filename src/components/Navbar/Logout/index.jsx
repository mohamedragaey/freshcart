import React, { useContext } from 'react'
import { userContext } from '../../../Context/UserContext';

const Logout = () => {
    const { logout } = useContext(userContext);

    return (
        <button className="nav-link" aria-current="page" onClick={() => logout()}>
            Logout
        </button>
    )
}

export default Logout
