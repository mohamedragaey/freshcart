import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Helmet } from "react-helmet";
import { cartContext } from '../../Context/CartContext'

export default function ProductDetails() {
  const { addToCart } = useContext(cartContext);

  let params = useParams();
  console.log(params);
  console.log(params.id);

  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  let { data } = useQuery("ProductDetails", () => getProductDetails(params.id));

  let info = data?.data.data;

  return <>

    <Helmet>
      <title>Product Details</title>
    </Helmet>

    <div className='container'>
      <div className='row py-2'>
        <div className='col-md-4'>
          <div>
            <img src={info?.imageCover} className='w-100' alt={info?.title} />
          </div>
        </div>
        <div className='col-md-8 d-flex align-items-center'>
          <div>
            <h2 className='h5 mb-4' style={{ fontFamily: 'bold' }}>{info?.title}</h2>
            <p>{info?.description}</p>
            <p>{info?.category.name}</p>
            <div className='d-flex justify-content-between'>
              <p>Price : {info?.price} EGP</p>
              <p><span>Average Rate : <i className="fa-solid fa-star bg-star"></i></span> {info?.ratingsAverage}</p>
            </div>
            <button onClick={() => addToCart(info?.id)} className='btn bg-main w-100 text-white'>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </>
}
