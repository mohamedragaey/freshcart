import React from 'react'
import logo from '../../../Assets/images/freshcart-logo.svg'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <Link className="navbar-brand" to="/home">
            <img src={logo} alt='Fresh market Logo' />
        </Link>
    )
}

export default Logo
