import React from 'react'
import { Link } from 'react-router-dom'

const AuthMenuLinks = () => {
    return (
        <ul className='navbar-nav'>
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="register">Register</Link>
            </li>
        </ul>
    )
}

export default AuthMenuLinks
