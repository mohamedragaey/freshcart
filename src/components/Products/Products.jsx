import React from 'react'
import { Helmet } from "react-helmet";
import ProductList from './productList';

const Products = () => {
  return (
    <>
      <Helmet>
        <title>Product</title>
      </Helmet>

      <div className='container'>
        <div className='row'>
          <ProductList />
        </div>
      </div>
    </>
  )
}

export default Products
