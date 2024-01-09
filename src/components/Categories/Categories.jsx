import React, { useEffect, useState } from 'react'
import Style from './Categories.module.css'
import axios from 'axios'
import { CirclesWithBar } from  'react-loader-spinner'


export default function Categories() {

  let [categories , setGategories] = useState(null)

  async function getAllGategories(){
     let {data} =  await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
     console.log(data.data)
     setGategories(data.data)
  }

  useEffect( ()=>{
    getAllGategories();
  } , [])
  return <>

    {categories ? 

    <div className="container">
    <div className='row'>
      {categories.map( (category)=>{return <div key={category._id} className='col-md-3 mb-4'>
        <div className={Style.category}>
            <img src={category.image} alt={category.name} className='w-100' height={250} /> 
            <h5 className='text-center'>{category.name}</h5>
            <span className='text-center'>{category.slug}</span>
        </div>
      </div> } ) }
    </div>
</div>

    :
    
    <div className='w-100 h-100 d-flex justify-content-center align-item-center'>
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
</div> }

</>
}
