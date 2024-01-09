import React, { useContext, useEffect } from 'react'
import Style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { userContext } from '../../Context/UserContext'
import { Offline, Online } from "react-detect-offline";

export default function Layout() {

  let {setUserToken} = useContext(userContext);

  useEffect( ()=>{
    if(localStorage.getItem('userToken') !== null ){

      setUserToken(localStorage.getItem('userToken'))

    }
  } , [])


  return <>

    <Navbar/>
     <Outlet/>
      <div>
        <Offline>
          <div className='network'>
           <i className="fa-solid fa-wifi"></i> You are Offline
          </div>
        </Offline>
      </div>
    <Footer/>

</>
}
