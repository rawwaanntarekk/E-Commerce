import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup'










  export default  function Signup() {
    const [label, setLabel] = useState(true);
    let navigate = useNavigate();
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState(null);
    //checking if the input is empty - if it is empty then the label will be shown
    function checkEmpty(e){
        console.log(e.target.value.length);
        if (e.target.value.length === 0) {
         setLabel(true);
        }
        else{
            setLabel(false);
        }
     
     }

     useEffect(() => {
     } , [label])

     async function SignUp(values){
        setIsLoading(true);

        let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values).catch((err) => {
           setError(err.response.data.message);
            setIsLoading(false);
        });

        if (data.message === "success") {
               navigate('/signin');
               setIsLoading(false);
           }
     }

  


     //! Validating Form inputs using Yup
    let validationSchema = yup.object({
        name:yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
        email:yup.string().required("Email is required").email("Email must respect this format : example@example.com"),
        phone:yup.string().required("Phone is required").matches(/^01[1250][0-9]{8}$/, "Phone must respect this format : 01{1,2,5,0}XXXXXXXX"),
        password:yup.string().required("Password is required").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[$%&@!]).{8,}$/, "Password must contain at least 8 characters, including uppercase, lowercase, numbers and special characters"),
        rePassword:yup.string().required("RePassword is required").oneOf([yup.ref('password')], "RePassword must match the password")
    })

     let formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            phone:'',
            password:'',
            rePassword:''},
            onSubmit:SignUp,
            validationSchema: validationSchema
        })
     

    
  return (
    <div>
        <h1 className='text-main text-center my-4'>Register Form</h1>
        <form onSubmit={formik.handleSubmit} className='signin'>
            <div className="row  gy-2 mx-auto my-3 ">
                <div className=" col-sm-12 col-10 col-md-12 mx-auto mb-4 ">
                    <label htmlFor="name" className={`${label?"": "show-label" } text-main`} >Name</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} onInput={(e) => {checkEmpty(e); }} type="text" name='name' id='name' className=' form-control py-2 ' placeholder='Name' />
                    {formik.errors.name&& formik.touched.name? <p className='error'>{formik.errors.name}</p>:""}
                    
                </div>
                <div className="col-sm-12 col-10 col-md-12 mx-auto  mb-4">
                    <label htmlFor="email" className={`${label?"": "show-label"} text-main`} > Email</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} onInput={(e) => {checkEmpty(e)}}type="email" name='email' id='email'  className=' form-control py-2' placeholder='Email' />
                    {formik.errors.email&& formik.touched.email? <p className='error'>{formik.errors.email}</p>:""}
                </div>
                <div className="col-sm-12 col-10 col-md-12 mx-auto mb-4">
                    <label htmlFor="phone" className={`${label?"": "show-label"} text-main`}> Phone</label>
                    <input  onBlur={formik.handleBlur} onChange={formik.handleChange} onInput={(e) => {checkEmpty(e)}}type="tel" name='phone' id='phone'  className=' form-control py-2' placeholder='Phone' />
                    {formik.errors.phone&& formik.touched.phone? <p className='error'>{formik.errors.phone}</p>:""}
                </div>
                <div className="col-sm-12 col-10 col-md-12 mx-auto mb-4">
                    <label htmlFor="password" className={`${label?"": "show-label"} text-main`}>Password</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} onInput={(e) => {checkEmpty(e)}} type="password" id='password' name='password'  className=' form-control py-2' placeholder='Password' />
                    {formik.errors.password&& formik.touched.password? <p className='error'>{formik.errors.password}</p>:""}
                </div>
                <div className="col-sm-12 col-10 col-md-12 mx-auto mb-4">
                    <label htmlFor="rePassword" className={`${label?"": "show-label"} text-main`}>Repassword</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange}  onInput={(e) => {checkEmpty(e)}}type="password" name='rePassword' id='rePassword'  className=' form-control py-2' placeholder='RePassword' />
                    {formik.errors.rePassword&& formik.touched.rePassword? <p className='error'>{formik.errors.rePassword}</p>:""}
                    <p className='text-muted pt-2'>Have An Account ? <Link  to="../Signin/Signin.jsx" className='fw-bold text-main'>Signin</Link> </p>
                    {error? <p className='error'>{error}</p>:""}
                </div>
             
                <div className="col-sm-12 col-10 col-md-12 mx-auto text-end">
               
                  <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light px-4 '> Register
                  {isLoading ? <i class="fa-solid fa-spinner fa-spin mx-2"></i>:""}
                  </button>
                    </div>


            </div>

        </form>
    </div>
  )
}
