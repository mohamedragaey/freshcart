import React from 'react'
import CookiesStorageService from '../../services/CookiesStorageService';
import Logout from './Logout';
import SocialMediaLinks from './SocialMediaLinks';
import NavbarMenu from './NavbarMenu';
import AuthMenuLinks from './AuthMenuLinks';
import Logo from './Logo';

const StorageService = CookiesStorageService.getService()

export default function Navbar() {
  let userToken = StorageService.getAccessToken()

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Logo />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {!!userToken && <NavbarMenu />}
          <SocialMediaLinks />
          {!!userToken && <Logout />}
          {!userToken && <AuthMenuLinks />}
        </div>
      </div>
    </nav>
  )
}
