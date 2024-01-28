import React, { useContext } from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from "react-router-dom";
import { LoginFormValidation } from '../../services/validationSchema';
import { userContext } from '../../Context/UserContext';

const Login = () => {
  const navigate = useNavigate()
  const { isUserAuth, error, LoginSubmit } = useContext(userContext);

  React.useEffect(() => {
    if (isUserAuth) {
      navigate('/home')
    }
  }, [isUserAuth])

  const formik = useFormik({
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
        <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type='email' className='form-control mb-2' id='email' name='email' autoComplete='email' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-2 mt-2" role="alert">{formik.errors.email}</div> : ""}

        <label htmlFor='password'>password : </label>
        <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type='password' className='form-control mb-2' id='password' name='password' autoComplete='current-password' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2 mt-2" role="alert">{formik.errors.password}</div> : ""}

        <div className='d-flex justify-content-start'>
          <div className='d-flex align-items-center'>
            <button type='submit' className='btn bg-main mt-2 me-2 text-white'>Login</button>
            <Link to="/Register" className='text-decoration-none text-black'>Register Here</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
