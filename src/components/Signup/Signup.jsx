import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'






export default function Signup() {
    const [label, setLabel] = useState(true);
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


     //! Validating Form inputs 
    function validate(values){
        let errors = {};

        //^ Name Validation
        if(!values.name){
            errors.name = 'Name is required';
        }
        else if(values.name.length < 3){
            errors.name = 'Name must be at least 3 characters';
        }

        //^ Email Validation
        if(!values.email){
            errors.email = 'Email is required';
        }
        else if (!/^[a-zA-Z0-9\\.]+@[a-zA-z]+\.[a-zA-z]{2,}/.test(values.email)) {
            errors.email = "Email must repect this format : example@example.com";
        }

        //^ Phone Validation
        if (!values.phone) {
            errors.phone = 'Phone is required';
        }
        else if (!/^01[1250][0-9]{8}$/.test(values.phone)) {
            errors.phone = "Phone must respect this format : 01XXXXXXXXX";
        
        }

        //^ Password Validation
        if (!values.password) {
            errors.password = 'Password is required';
        }
        else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[$%&@!]).{8,}$/.test(values.password)) {
            errors.password = "Password must contain at least 8 characters, including uppercase, lowercase, numbers and special characters";
        }

        //^ RePassword Validation
        if (!values.rePassword) {
            errors.rePassword = 'RePassword is required';
        }
        else if (values.rePassword !== values.password) {
            errors.rePassword = "RePassword must match the password";
        }

        return errors;
        
        
        

     }

     let formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            phone:'',
            password:'',
            rePassword:''},
            onSubmit: (values)=> {console.log(values);},
            validate
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
                </div>
             
                <div className="col-sm-12 col-10 col-md-12 mx-auto text-end">
                  <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light px-4 '> Register</button>
                    </div>


            </div>

        </form>
    </div>
  )
}
