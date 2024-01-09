// import React, { useEffect, useState } from 'react'
// import Style from './Products.module.css'
import axios from 'axios'
import { useContext } from 'react';
import { CirclesWithBar } from  'react-loader-spinner'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import {Helmet} from "react-helmet";
import toast from 'react-hot-toast';




export default function Products() {

  let {addToCart} = useContext(cartContext)
  // console.log(x)

  async function addCartProduct(productId){

    let response = await addToCart(productId)
    console.log(response)

    if(response.data?.status ==="success"){
      toast.success('Product Added Successfully',{
        duration: 3000,
        position: 'top-center',
      });
    }
    else{
      toast.error('Please Try Again',{
        duration: 3000,
        position: 'top-center',
      });
    }

}

  // let [Allproducts , setAllproducts] = useState(null)

  //  async function getAllProducts (){

  //     let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  //     console.log(data.data)
  //     setAllproducts(data.data)

  // }

  // useEffect( ()=>{
  //   getAllProducts()
  // } , [])



  //handle by using react query to saving cash to prevent more request on server

  function getAllProducts(){

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  
  }

   const {isLoading , isError , data  , isFetching, refetch} = useQuery("Feature Product " , getAllProducts ,{
    // cacheTime:3000,
    // refetchOnMount:true,
    // staleTime:3000,
    // refetchInterval:3000,
    // enabled:false
   })
  //  console.log(data?.data.data) , 
  // console.log("isloading", isLoading)
  // console.log("isFetching", isFetching)

  
  
   


 
  return <>

    <Helmet>
        <title>Product</title>
    </Helmet>




    {isLoading ?   <div className='w-100 h-100 d-flex justify-content-center align-item-center'>
                    <CirclesWithBar
                          height="100"
                          width="100"
                          color="#4fa94d"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                          outerCircleColor=""
                          innerCircleColor=""
                          barColor=""
                          ariaLabel='circles-with-bar-loading'
                        />
                </div>


    : 

<div className='container'>
      <div className='row'>

      { data?.data.data.map( (prod , idx)=>{ return <div key={idx} className='col-md-2'>
         
         <div className='product py-3 px-2'>
            <Link to={`/productdetails/${prod.id} `}>
                    <img src={prod.imageCover} className='w-100' alt='' />
                    <h6 className='text-main'>{prod.category.name}</h6>
                    <h5>{prod.title .split(" ").slice(0,2).join(" ")}</h5>
                    <div className='d-flex justify-content-between align-items-center'>
                        <p>{prod.price} EGP</p>
                        <p><span><i className="fa-solid fa-star bg-star"></i></span> {prod.ratingsAverage}</p>
                    </div>
                    
            </Link>
            <button onClick={()=>addCartProduct(prod.id)} className='btn bg-main w-100 text-white'>add to cart</button>
         </div>
        
       
        
          

      </div>} ) }
        
      </div> 
</div>

   
}
    
</>
}
