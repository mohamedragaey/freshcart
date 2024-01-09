import { createContext, useEffect } from "react";
import axios from 'axios'
import CookiesStorageService from '../services/CookiesStorageService'

const StorageService = CookiesStorageService.getService()
const token = StorageService.getAccessToken()


let headers = {headers: {'token': token}}

export let cartContext =  createContext();


export default function CartContextProvider(props){

   

//==== Function for Add Product to cart 
 function addToCart(productID) {
  return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        productId:productID 
    },
    {
        headers : headers
    }).then( (response)=> response )
    .catch( (error)=> error);
}



//==== Function  for get Cart and display 
function getLoggedUserCart(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart' ,headers)
    .then( (response)=> response )
    .catch( (error)=> error )
  }

//==== Function to remove product from cart 
function removeFromCart(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers:headers
    }).then( (response)=> response)
    .catch( (error)=> error)
}  

//==== Function to update Cart Product Quantity
function updateCartQuantity(id , count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,{
        count:count
    } ,{
        headers:headers
    } ).then((res)=> res )
    .catch( (err)=> err )
}



//==== Function  for  Clear Cart
function ClearUserCart(){
    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart' ,{

       headers : headers

    }).then( (response)=> response )
    .catch( (error)=> error )
  }

    return <cartContext.Provider value={{addToCart , getLoggedUserCart , removeFromCart , updateCartQuantity , ClearUserCart }}> 
        {props.children}
    </cartContext.Provider>
}