import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { Offline } from "react-detect-offline";

export default function Layout() {

  return (
    <>
      <Navbar />
      <Outlet />
      <div>
        <Offline>
          <div className='network'>
            <i className="fa-solid fa-wifi"></i> You are Offline
          </div>
        </Offline>
      </div>
      <Footer />
    </>
  )
}
