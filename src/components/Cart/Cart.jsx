import React, { useContext, useEffect } from 'react'
import Style from './Cart.module.css'
import { cartContext } from '../../Context/CartContext'
// import {useQuery} from 'react-query'
import { useState } from 'react';
import { BallTriangle } from 'react-loader-spinner'
import CookiesStorageService from '../../services/CookiesStorageService';

const StorageService = CookiesStorageService.getService()

export default function Cart() {

  let {getLoggedUserCart ,removeFromCart , updateCartQuantity ,ClearUserCart  } = useContext(cartContext);

  let [cartDetails ,setCartDeatils ]= useState(null)
  let [totalPrice , setTotalPrice] = useState(null)
  

  async function getCart(){
      let {data} = await getLoggedUserCart()
      console.log(data)
      // console.log(data.data.totalCartPrice)
      setCartDeatils(data)
      setTotalPrice(data.data.totalCartPrice)
      
      
  }

  async function removeCart(id){
    let {data} = await removeFromCart(id)
    setCartDeatils(data)
  }

  async function updateCount(id, count ){
     let {data} = await updateCartQuantity(id,count)
     setCartDeatils(data)
  }

  async function clearCart(){
       await ClearUserCart()
       setCartDeatils([])
       
  }

  
 
  
 
 


  useEffect( ()=>{
    if (!!StorageService.getAccessToken()) {
    getCart()
    }
   
  },[] )

  

 

 


 




  return <>

    
    {cartDetails ?
     <div className='w-75 bg-main-light mx-auto pt-3 px-3 my-3'>
     <div className='d-flex justify-content-between mb-4'>
          <h3>Shop Cart</h3>
          <button className='btn bg-main btn-color' onClick={()=>clearCart()}>Clear</button>
     </div>
     
     <h4 className='h6 text-main fw-bolder'>Total Cart Price : {  totalPrice } EGP</h4>

     {cartDetails.data.products.map( (product , indx)=> <div key={indx} className='row border-bottom py-3 my-2'>

      <div className='col-md-1'>
        <img className='w-100' src={product.product.imageCover} alt={product.product.title} />
      </div>

      <div className='col-md-11'>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <h3 className='h6'>{product.product.title.split(" ").slice(0,7).join(" ")}</h3>
            <h6 className='text-main'>Price {product.price} EGP</h6>
          </div>

          <div>
            <button onClick={()=>updateCount(product.product.id ,product.count + 1)} className='btn brdr-main btn-padding'>+</button>
            <span className='mx-2'>{product.count}</span>
            <button onClick={()=>updateCount(product.product.id ,product.count - 1)} className='btn brdr-main btn-padding'>-</button>
          </div>
        </div>
        <button className='btn p-0' onClick={()=> removeCart(product.product.id) }><span className='font-sm text-danger fas fa-trash-can'></span> Remove</button>
      </div>

     </div> ) }
     


 </div>

     :
     <div className='d-flex justify-content-center align-items-center'>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
      />
     </div>
     }

</>
}
