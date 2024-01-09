import React from 'react'
import Style from './CategorySlider.module.css'
import axios from 'axios'
import { useQuery } from 'react-query';
import Slider from "react-slick";

export default function CategorySlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
   
    // dotsClass:'slick-dots'
    
    // customPaging: i => (
    //   <div
    //     style={{
    //       width: "30px",
    //       // color: "blue",
    //       // backgroundColor:"red",
    //       // border: "1px blue solid"
    //     }}
    //   >
    //     {i}
    //   </div>
    // )
  };



  //Function to get All Categories from api 
  function getAllCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  
   let {isError , isLoading , data} = useQuery("AllCategories" , ()=> getAllCategories() )
   console.log(data?.data.data)




  return <>

    <div className='container'>
      <div className='row py-4'>
          {data?.data.data?
          <Slider {...settings}>
            { data?.data.data.map((category)=> <img height={180} key={category._id} src={category.image} />  ) }
          </Slider>
          :''}
      </div>
    </div>

</>
}
