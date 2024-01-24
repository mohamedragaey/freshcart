import React, { createContext, useState } from "react";
import axios from 'axios'
import CookiesStorageService from '../services/CookiesStorageService'

const StorageService = CookiesStorageService.getService()
const token = StorageService.getAccessToken()

let headers = { headers: { 'token': token } }

export let cartContext = createContext();

export default function CartContextProvider(props) {
    let [loading, setLoading] = useState(false)
    let [cartDetails, setCartDeatils] = useState(null)
    let [totalPrice, setTotalPrice] = useState(null)
    let [errorMessage, setErrorMessage] = useState('')

    const addToCart = (productID) => {
        if (!!token) {
            return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: productID }, headers)
                .then((response) => response)
                .catch((error) => error);
        }
    }

    const getLoggedUserCart = () => {
        if (!!token) {
            setLoading(true)
            setErrorMessage('')
            axios.get('https://ecommerce.routemisr.com/api/v1/cart', headers)
                .then((response) => {
                    setLoading(false);
                    setCartDeatils(response?.data)
                    setTotalPrice(response?.data?.data?.totalCartPrice)
                })
                .catch((error) => {
                    setLoading(false);
                    setErrorMessage(error?.response?.data?.message)
                })
        }
    }

    const removeFromCart = (id) => {
        if (!!token) {
            setLoading(true)
            setErrorMessage('')
            axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, headers)
                .then((response) => {
                    setLoading(false)
                    setCartDeatils(response?.data)
                })
                .catch((error) => {
                    setLoading(false);
                    setErrorMessage(error?.response?.data?.message)
                })
        }
    }

    const updateCartQuantity = (id, count) => {
        if (!!token) {
            setLoading(true)
            setErrorMessage('')
            return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count: count }, headers)
                .then((response) => {
                    setLoading(false)
                    setCartDeatils(response?.data)
                })
                .catch((error) => {
                    setLoading(false);
                    setErrorMessage(error?.response?.data?.message)
                })
        }
    }

    const ClearUserCart = () => {
        if (!!token) {
            setErrorMessage('')
            return axios.delete('https://ecommerce.routemisr.com/api/v1/cart', headers)
                .then(() => {
                    setLoading(false)
                    setCartDeatils({})
                })
                .catch((error) => {
                    setLoading(false);
                    setErrorMessage(error?.response?.data?.message)
                })
        }
    }

    return (
        <cartContext.Provider
            value={{
                addToCart,
                getLoggedUserCart,
                removeFromCart,
                updateCartQuantity,
                ClearUserCart,
                loading,
                setLoading,
                cartDetails,
                totalPrice,
                errorMessage,
            }}>
            {props.children}
        </cartContext.Provider>
    )
}
