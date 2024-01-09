import React from 'react'
import Style from './Footer.module.css'
import masterCard from '../../Assets/images/MasterCard_Logo.png'
import PayPal from '../../Assets/images/PayPal.png'
import amazonePay from '../../Assets/images/logo_amazonpay.png'
import googleplay from '../../Assets/images/googlePlay.png'
import appstore from '../../Assets/images/apple-app-store-logo.jpg'


export default function Footer() {
  return <>

    <div className='bg-footer'>
      <div className='container'>
          <div>
            <h4>Get the FreshCart app </h4>
            <p>we will send you a link , open it on your phone to download app</p>
          </div>
          <div className='row'>
            <div className='col-md-10'>
               <input type='email' className='form-control mb-4' placeholder='Email..'/>
            </div>
            <div className='col-md-2'>
               <button className='btn bg-main btn-color w-100'>Share App Link</button>
            </div>
          </div>
          <hr/>

          <div className='row'>
            <div className='col-md-6'>
              <div className='d-flex align-items-center mb-4'>
                <span className='me-2'>Payment Partners</span>
                <img className='me-2' src={amazonePay} alt='amazone' width={80}/>
                <img className='me-2' src={masterCard} alt='masterCard' width={50}/>
                <img className='me-2' src={PayPal} alt='Paypal' width={60}/>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='d-flex justify-content-end align-items-center'>
                <span className='me-2'>Get deliveries with FreshCart</span>
                <img className='me-2' src={appstore} alt='App Store' width={120} height={40}/>
                <img className='' src={googleplay} alt='Google Play' width={120} height={40}/>
                
              </div>
            </div>
          </div>
          <hr/>
       
      </div>
    </div>

</>
}
