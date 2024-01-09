import React, { useState } from 'react'
import Style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import  axios  from 'axios'
import { useNavigate } from "react-router-dom";
import { Bars } from  'react-loader-spinner'



export default function Register() {

  let navgate = useNavigate();

  let [error , seterror] =useState(null);
  const [isloading , setLoading] = useState(false);

   async function Register(values){
    // console.log(values)
    setLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values )
    .catch((error) => {
    //  console.log('error...',error.response.data.message)  
     setLoading(false)
     seterror(error.response.data.message)      
    })
   
    if(data.message === 'success'){
      setLoading(false)
      navgate('/login')

    }
   
   

   
   
  }

  // function validate(values){
  //   let errors={};
  //   let emailReg=  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  //   if(!values.name){
  //     errors.name="Name is Required";
  //   }
  //   else if(values.name.length < 3){
  //     errors.name="name min length is 3";
  //   }
  //   else if(values.name.length > 10){
  //     errors.name="name max length is 10";
  //   }

  //   if(!values.email){
  //     errors.email="email is Required";
  //   }
  //   else if(emailReg.test(values.email)){
  //     errors.email="email is invalid";
  //   }
   
   
  //   return errors;
   

  // }
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  let validateSchema = Yup.object({
    name:Yup.string().min(3,'name is min lenght 3').max(10,'name is max lenght 10').required('name is Required'),
    email:Yup.string().email('email is invalid').min(16,'email is min lenght 16').max(40 ,'email is min lenght 16').required('email is required'),
    phone:Yup.string().matches(phoneRegExp , 'phone is invalid').required('phone is required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password is invalid').required('password is required'),
    rePassword:Yup.string().oneOf([Yup.ref("password")] , " passeord and rePassword are not matched").required('rePassword is required')
  })

  let formik = useFormik({
    initialValues:{ 
       name: '',
       email:'',
       password:'',
       rePassword:'',
       phone:''
    },validationSchema:validateSchema,
    onSubmit:Register
  })
 


  return <>

    <div className='w-75 m-auto py-4'>

     {error ? <div className='alert alert-danger'>{error}</div> : ''}
    <h2 className='mb-3'>Register Now</h2>
    <form onSubmit={formik.handleSubmit}>
     <label htmlFor='name'>Name : </label>
     <input value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange}  type='text' className='form-control mb-2' id='name'  name='name' />
    {formik.errors.name && formik.touched.name ? <div className="alert alert-danger py-2 mt-2" role="alert">{formik.errors.name}</div>:""}
    

     <label htmlFor='email'>Email : </label>
     <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange}  type='email' className='form-control mb-2' id='email'  name='email' />
     {formik.errors.email && formik.touched.email? <div className="alert alert-danger py-2 mt-2" role="alert">{formik.errors.email}</div>:""}


     <label htmlFor='phone'>phone : </label>
     <input value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange}  type='tel' className='form-control mb-2' id='phone'  name='phone' />
      {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger py-2 mt-2" role="alert">{formik.errors.phone}</div>:""}
     
      <label htmlFor='password'>password : </label>
     <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange}  type='password' className='form-control mb-2' id='password'  name='password' />
     {formik.errors.password && formik.touched.password? <div className="alert alert-danger py-2 mt-2" role="alert">{formik.errors.password}</div>:""}

     <label htmlFor='rePassword'>rePassword : </label>
     <input value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange}  type='password' className='form-control mb-2' id='rePassword'  name='rePassword' />
      {formik.errors.rePassword && formik.touched.rePassword? <div className="alert alert-danger py-2 mt-2" role="alert">{formik.errors.rePassword}</div>:""}


    <div className='d-flex justify-content-start'>
    
      {isloading ? <button type='button' className='btn bg-main mt-2 text-white'>
      <Bars
        height="20"
        width="20"
        color="#fff"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      </button> : <button disabled ={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main mt-2 text-white'>Register</button>}
    </div>
       

   </form>
    </div>

    

</>
}
