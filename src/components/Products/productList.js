import React from 'react'
import { useContext } from 'react';
import { cartContext } from '../../Context/CartContext';
import ProductListItem from './ProductListItem';

const ProductList = () => {
    const { productsList } = useContext(cartContext);

    return (
        <>
            {productsList?.map((prod, idx) => <ProductListItem item={prod} index={idx} />)}
        </>
    )
}

export default ProductList
