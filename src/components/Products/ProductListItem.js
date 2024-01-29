import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';

const ProductListItem = ({ item, index }) => {
    const { addToCart } = useContext(cartContext);

    return (
        <div key={index} className='col-md-2'>
            <div className='product py-3 px-2'>
                <Link to={`/productdetails/${item.id} `}>
                    <img src={item.imageCover} className='w-100' alt='' />
                    <h6 className='text-main'>{item.category.name}</h6>
                    <h5>{item.title.split(" ").slice(0, 2).join(" ")}</h5>
                    <div className='d-flex justify-content-between align-items-center'>
                        <p>{item.price} EGP</p>
                        <p><span><i className="fa-solid fa-star bg-star"></i></span> {item.ratingsAverage}</p>
                    </div>
                </Link>
                <button onClick={() => addToCart(item.id)} className='btn bg-main w-100 text-white'>add to cart</button>
            </div>
        </div>
    )
}

export default ProductListItem
