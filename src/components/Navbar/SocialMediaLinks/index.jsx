import React from 'react'

const SocialMediaLinks = () => {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item d-flex align-items-center">
        <a href='http://instagram.com/' target='_blank' rel="noreferrer">
          <i className="fa-brands fa-instagram mx-2"></i>
        </a>
      </li>
      <li className="nav-item d-flex align-items-center">
        <a href='http://facebook.com/' target='_blank' rel="noreferrer">
          <i className="fa-brands fa-facebook mx-2"></i>
        </a>
      </li>
      <li className="nav-item d-flex align-items-center">
        <a href='https://twitter.com/' target='_blank' rel="noreferrer">
          <i className="fa-brands fa-twitter mx-2"></i>
        </a>
      </li>
      <li className="nav-item d-flex align-items-center">
        <a href='https://youtube.com/' target='_blank' rel="noreferrer">
          <i className="fa-brands fa-youtube mx-2"></i>
        </a>
      </li>
    </ul>
  )
}
export default SocialMediaLinks