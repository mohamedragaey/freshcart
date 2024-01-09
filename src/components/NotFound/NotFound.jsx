import React from 'react'
import Style from './NotFound.module.css'
import notfound from '../../Assets/images/notfound.jpg'

export default function NotFound() {
  return <>

    <div className='d-flex justify-content-center align-items-center'>
      <img src={notfound} alt='Not Found' width={600} />
    </div>

</>
}
