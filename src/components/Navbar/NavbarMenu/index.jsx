import React from 'react'
import { Link } from 'react-router-dom'

const NavbarMenu = () => {
    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="cart">Cart</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="product">Products</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="categories">Categories</Link>
            </li>
        </ul>
    )
}

export default NavbarMenu
