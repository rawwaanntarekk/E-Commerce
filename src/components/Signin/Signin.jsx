import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import  { UserToken } from '../../Context/TokenContext.js';




export default function Signin() {
    let {setToken} = useContext(UserToken);


    const [EmailLabel, setEmailLabel] = useState(true);
    const [PasswordLabel, setPasswordLabel] = useState(true);
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState(null);
    // const [visible , setVisible] = useState(false);

    let navigate = useNavigate();
    //checking if the input is empty - if it is empty then the label will be shown
    function checkEmpty(e){
        console.log(e.target.value.length);
        if (e.target.value.length === 0 ) {
            if (e.target.name === 'email'){
                setEmailLabel(false);
            }

            if (e.target.name === 'password'){
                setPasswordLabel(false);
            }
        }else{
            if (e.target.name === 'email'){
                setEmailLabel(false);
            }

            if (e.target.name === 'password'){
                setPasswordLabel(false);
            }

           
        }
         
     
     }

    useEffect(() => {
    } , [])

    async function SignUp(values){
        setIsLoading(true);

        let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , values).catch((err) => {
            setError(err.response.data.message);
            setIsLoading(false);
        });

        if (data.message === "success") {
            navigate('/home');
            setIsLoading(false);
            setToken(data.token);
            localStorage.setItem("UserToken" , data.token);


        }
    }



     //! Validating Form inputs using Yup
    let validationSchema = yup.object({
        email:yup.string().required("Email is required").email("Email must respect this format : example@example.com"),
        password:yup.string().required("Password is required").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[$%&@!]).{8,}$/, "Password must contain at least 8 characters, including uppercase, lowercase, numbers and special characters"),
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
    <div className='my-5 py-5'>
        <h1 className='text-main text-center my-5'>Login Form</h1>
        <form onSubmit={formik.handleSubmit} className='signin'>
            <div className="row  gy-2 mx-auto my-3 ">
                
                <div className="col-sm-12 col-10 col-md-12 mx-auto  mb-4">
                    <label htmlFor="email" className={`${EmailLabel?"": "show-label"} text-main`} > Email</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} onInput={(e) => {checkEmpty(e)}}type="email" name='email' id='email'  className=' form-control py-2' placeholder='Email' />
                    {formik.errors.email&& formik.touched.email? <p className='error'>{formik.errors.email}</p>:""}
                </div>

                <div className="col-sm-12 col-10 col-md-12 mx-auto mb-4">
                    <label htmlFor="password" className={`${PasswordLabel?"": "show-label"} text-main`}>Password</label>
                    <div className=' position-relative '>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} onInput={(e) => {checkEmpty(e)}} type="password" id='password' name='password'  className=' form-control py-2' placeholder='Password' />
                    <p className='text-muted pt-2'>Don't have an account ? <Link  to="/signup" className='fw-bold text-main'>Signup</Link> </p>
                    {error? <p className='error'>{error}</p>:""}
                    {/* {!visible? <i class={`${style.p} fa-solid fa-eye position-absolute translate-middle-y top-50 `}></i>:""}  */}
                    {formik.errors.password&& formik.touched.password? <p className='error'>{formik.errors.password}</p>:""}

                    </div>
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
