import React, { useContext } from 'react'
import Logout from './Logout';
import SocialMediaLinks from './SocialMediaLinks';
import NavbarMenu from './NavbarMenu';
import AuthMenuLinks from './AuthMenuLinks';
import Logo from './Logo';
import { userContext } from '../../Context/UserContext';

export default function Navbar() {
  const { isUserAuth } = useContext(userContext);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Logo />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {!!isUserAuth && <NavbarMenu />}
          <SocialMediaLinks />
          {!!isUserAuth && <Logout />}
          {!isUserAuth && <AuthMenuLinks />}
        </div>
      </div>
    </nav>
  )
}
