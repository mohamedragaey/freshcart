import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { Bars } from 'react-loader-spinner'
import { userContext } from '../../Context/UserContext'
import CookiesStorageService from '../../services/CookiesStorageService'
import { LoginFormValidation } from '../../services/validationSchema';

const StorageService = CookiesStorageService.getService()

export default function Login() {

  let navgate = useNavigate();

  let { setUserToken } = useContext(userContext);

  let [error, seterror] = useState(null);
  const [isloading, setLoading] = useState(false);

  async function LoginSubmit(values) {
    setLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((error) => {
        setLoading(false)
        seterror(error.response.data.message)
      })

    if (data.message === 'success') {
      setLoading(false)
      StorageService.setToken(data.token)
      setUserToken(data.token)
      navgate('/')
    }
  }

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginFormValidation,
    onSubmit: LoginSubmit
  })

  return (
    <div className='w-75 m-auto py-4'>
      {error ? <div className='alert alert-danger'>{error}</div> : ''}
      <h3 className='mb-3'>Login Now</h3>
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor='email'>Email : </label>
        <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' className='form-control mb-2' id='email' name='email' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-2 mt-2" role="alert">{formik.errors.email}</div> : ""}

        <label htmlFor='password'>password : </label>
        <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type='password' className='form-control mb-2' id='password' name='password' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2 mt-2" role="alert">{formik.errors.password}</div> : ""}

        <div className='d-flex justify-content-start'>
          {isloading ?
            <button type='button' className='btn bg-main mt-2 me-2 text-white'>
              <Bars
                height="20"
                width="20"
                color="#fff"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </button>
            :
            <div className='d-flex align-items-center'>
              <button type='submit' className='btn bg-main mt-2 me-2 text-white'>Login</button>
              <Link to="/Register" className='text-decoration-none text-black'>Register Here</Link>
            </div>
          }
        </div>
      </form>
    </div>
  )
}
