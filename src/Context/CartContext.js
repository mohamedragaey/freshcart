import { createContext } from "react";
import axios from 'axios'
import CookiesStorageService from '../services/CookiesStorageService'

const StorageService = CookiesStorageService.getService()
const token = StorageService.getAccessToken()

let headers = { headers: { 'token': token } }

export let cartContext = createContext();

export default function CartContextProvider(props) {
    const addToCart = (productID) => {
        if (!!token) {
            return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: productID }, headers)
                .then((response) => response)
                .catch((error) => error);
        }
    }

    const getLoggedUserCart = () => {
        if (!!token) {
            return axios.get('https://ecommerce.routemisr.com/api/v1/cart', headers)
                .then((response) => response)
                .catch((error) => error)
        }
    }

    const removeFromCart = (id) => {
        if (!!token) {
            return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, headers)
                .then((response) => response)
                .catch((error) => error)
        }
    }

    const updateCartQuantity = (id, count) => {
        if (!!token) {
            return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count: count }, headers)
                .then((res) => res)
                .catch((err) => err)
        }
    }

    const ClearUserCart = () => {
        if (!!token) {
            return axios.delete('https://ecommerce.routemisr.com/api/v1/cart', headers)
                .then((response) => response)
                .catch((error) => error)
        }
    }

    return (
        <cartContext.Provider
            value={{
                addToCart,
                getLoggedUserCart,
                removeFromCart,
                updateCartQuantity,
                ClearUserCart
            }}>
            {props.children}
        </cartContext.Provider>
    )
}
