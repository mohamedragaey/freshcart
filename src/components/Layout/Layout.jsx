import React, { useContext } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { Offline } from "react-detect-offline";
import { userContext } from '../../Context/UserContext';
import { Bars } from 'react-loader-spinner'

export default function Layout() {
  const { isloading } = useContext(userContext);
  return (
    <>
      <Navbar />
      <main className="flex-fill">
        <Outlet />
      </main>
      <Offline>
        <div className='network'>
          <i className="fa-solid fa-wifi"></i> You are Offline
        </div>
      </Offline>
      <Footer />
      {isloading && <div className='bg-main w-100 h-100 position-fixed z-3 top-0 bottom-0 start-0 end-0 opacity-75 d-flex align-items-center justify-content-center'>
        <Bars
          height="50"
          width="50"
          color="#fff"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>}
    </>
  )
}
