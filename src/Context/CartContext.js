import React, { createContext, useState } from "react";
import axios from 'axios'
import CookiesStorageService from '../services/CookiesStorageService'
import toast from "react-hot-toast";

const StorageService = CookiesStorageService.getService()
const token = StorageService.getAccessToken()

let headers = { headers: { 'token': token } }

const cartContext = createContext({});

const CartContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [cartDetails, setCartDeatils] = useState(null)
    const [totalPrice, setTotalPrice] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [productsList, setProductsList] = useState([])

    const getAllProducts = () => {
        setLoading(true);
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then((response) => {
                setProductsList(response?.data?.data)
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setErrorMessage(error?.response?.data?.message)
            });
    }

    React.useEffect(() => {
        getAllProducts();
    }, [])

    const addToCart = (productID) => {
        if (!!token) {
            return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: productID }, headers)
                .then((response) => {
                    if (response.data?.status === "success") {
                        toast.success('Product Added Successfully', {
                            duration: 3000,
                            position: 'top-center',
                        });
                    }
                })
                .catch((error) => {
                    toast.error(`Please Try Again: ${error}`, {
                        duration: 3000,
                        position: 'top-center',
                    });
                });
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
                productsList
            }}>
            {children}
        </cartContext.Provider>
    )
}

export { CartContextProvider, cartContext }
