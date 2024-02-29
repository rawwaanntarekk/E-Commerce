import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';




export default function ResetPassword(values) {

  const [EmailLabel, setEmailLabel] = useState(true);
  const [newPassLabel, setnewPassLabel] = useState(true);
  const [isLoading , setIsLoading] = useState(false);
  let navigate = useNavigate();

  //^ Reset password logic
  async function resetPass(values){
    setIsLoading(true);
    let {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
    setIsLoading(false);
    if (data.token){
      navigate('/signin');
    }


  }

  //^ Hide label when input is empty and show it when it's not
  function ToggleLabel(e){
    if (e.target.value.length === 0 ) {
        if (e.target.name === 'email') {
            setEmailLabel(false);
        }

        else if (e.target.name === 'resetCode') {
          setnewPassLabel(false);
        }
        }
    else{
        if (e.target.name === 'email') {
            setEmailLabel(false);
        }

        else if (e.target.name === 'newPassword') {
          setnewPassLabel(false);
    }
}
}

  

  //^ Fomik for email and new password input
  let formik = useFormik({
    initialValues:{
        email:'',
        newPassword:''
            },
    onSubmit:resetPass,
    })
  return (
    <div className='pt-5 mt-5'>
    <form onSubmit={formik.handleSubmit} className='reset-password'>
            <div className="row  gy-2 mx-auto my-3 ">
                <div className="col-sm-12 col-10 col-md-12 mx-auto  mb-4">
                    <h3 className='text-main mb-5'>Please enter your email</h3>
                    <label htmlFor="email" className={`${EmailLabel?"": "show-label"} text-main`} > Email</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} onInput={(e) => {ToggleLabel(e)}}type="email" name='email' id='email'  className=' form-control py-2' placeholder='Email' />
                    {formik.errors.email&& formik.touched.email? <p className='error'>{formik.errors.email}</p>:""}
                </div>
                <div className="col-sm-12 col-10 col-md-12 mx-auto  mb-4">
                    <h3 className='text-main mb-5'>Please enter your new password</h3>
                    <label htmlFor="newPassword" className={`${newPassLabel?"": "show-label"} text-main`} > New Password</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} onInput={(e) => {ToggleLabel(e)}}type="password" name='newPassword' id='newPassword'  className=' form-control py-2' placeholder='New Password' />
                    {formik.errors.newPassword&& formik.touched.newPassword? <p className='error'>{formik.errors.newPassword}</p>:""}
                </div>
                <div className="col-sm-12 col-10 col-md-12 mx-auto ">
                <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light px-4 '> Reset Password
                {isLoading ? <i className="fa-solid fa-spinner fa-spin mx-2"></i>:""}
                </button>
                    </div>
            </div>
    </form>
    </div>
  )
}
