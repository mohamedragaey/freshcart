import React, { useContext, useState } from 'react'
import Style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import  axios  from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { Bars } from  'react-loader-spinner'
import { userContext } from '../../Context/UserContext'
import CookiesStorageService from '../../services/CookiesStorageService'


const StorageService = CookiesStorageService.getService()



export default function Login() {

  let navgate = useNavigate();

 let {setUserToken } = useContext(userContext);

  let [error , seterror] =useState(null);
  const [isloading , setLoading] = useState(false);

   async function LoginSubmit(values){
    // console.log(values)
    setLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values )
    .catch((error) => {
    //  console.log('error...',error.response.data.message)  
     setLoading(false)
     seterror(error.response.data.message)      
    })
   
    if(data.message === 'success'){
      setLoading(false)
      // localStorage.setItem("userToken" , data.token )
      StorageService.setToken(data.token)
      setUserToken(data.token)
      navgate('/')

    }
   
   

   
   
  }

 
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  let validateSchema = Yup.object({
   
    email:Yup.string().email('email is invalid').min(16,'email is min lenght 16').max(40 ,'email is min lenght 16').required('email is required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password is invalid').required('password is required')
   
  })

  let formik = useFormik({
    initialValues:{ 
     
       email:'',
       password:'',

    },validationSchema:validateSchema,
    onSubmit:LoginSubmit
  })
 


  return <>

    <div className='w-75 m-auto py-4'>

     {error ? <div className='alert alert-danger'>{error}</div> : ''}
    <h3 className='mb-3'>Login Now</h3>
    <form onSubmit={formik.handleSubmit}>
     

     <label htmlFor='email'>Email : </label>
     <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange}  type='email' className='form-control mb-2' id='email'  name='email' />
     {formik.errors.email && formik.touched.email? <div className="alert alert-danger py-2 mt-2" role="alert">{formik.errors.email}</div>:""}


   
     <label htmlFor='password'>password : </label>
     <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange}  type='password' className='form-control mb-2' id='password'  name='password' />
     {formik.errors.password && formik.touched.password? <div className="alert alert-danger py-2 mt-2" role="alert">{formik.errors.password}</div>:""}

  

    <div className='d-flex justify-content-start'>
    
      {isloading ? <button type='button' className='btn bg-main mt-2 me-2 text-white'>
      <Bars
        height="20"
        width="20"
        color="#fff"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      </button> : 
   
      <div className='d-flex align-items-center'>
        <button disabled ={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main mt-2 me-2 text-white'>Login</button>
        <Link to="/Register" className='text-decoration-none text-black'>Register Here</Link>
      </div>
     
      }
    </div>
       

   </form>
    </div>

    

</>
}
