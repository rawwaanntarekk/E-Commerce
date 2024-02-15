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


     let formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            phone:'',
            password:'',
            rePassword:''},
            onSubmit: (values)=> {console.log(values);}
        })
     

    
  return (
    <div>
        <h1 className='text-main text-center my-4'>Register Form</h1>
        <form onSubmit={formik.handleSubmit}>
            <div className="row  gy-2 mx-auto my-3 ">
                <div className=" col-sm-12 col-10 col-md-12 mx-auto mb-4 ">
                    <label htmlFor="name" className={`${label?"": "show-label" } text-main`} >Name</label>
                    <input onChange={formik.handleChange} onInput={(e) => {checkEmpty(e); }} type="text" name='name' id='name' className=' form-control py-2 ' placeholder='Name' />
                    
                </div>
                <div className="col-sm-12 col-10 col-md-12 mx-auto  mb-4">
                    <label htmlFor="email" className={`${label?"": "show-label"} text-main`} > Email</label>
                    <input onChange={formik.handleChange} onInput={(e) => {checkEmpty(e)}}type="email" name='email' id='email'  className=' form-control py-2' placeholder='Email' />
                </div>
                <div className="col-sm-12 col-10 col-md-12 mx-auto mb-4">
                    <label htmlFor="phone" className={`${label?"": "show-label"} text-main`}> Phone</label>
                    <input onChange={formik.handleChange} onInput={(e) => {checkEmpty(e)}}type="tel" name='phone' id='phone'  className=' form-control py-2' placeholder='Phone' />
                </div>
                <div className="col-sm-12 col-10 col-md-12 mx-auto mb-4">
                    <label htmlFor="password" className={`${label?"": "show-label"} text-main`}>Password</label>
                    <input onChange={formik.handleChange} onInput={(e) => {checkEmpty(e)}} type="password" id='password' name='password'  className=' form-control py-2' placeholder='Password' />
                </div>
                <div className="col-sm-12 col-10 col-md-12 mx-auto mb-4">
                    <label htmlFor="rePassword" className={`${label?"": "show-label"} text-main`}>Repassword</label>
                    <input onChange={formik.handleChange}  onInput={(e) => {checkEmpty(e)}}type="password" name='rePassword' id='rePassword'  className=' form-control py-2' placeholder='RePassword' />
                </div>
             
                <div className="col-sm-12 col-10 col-md-12 mx-auto text-end">
                  <button type='submit' className='btn bg-main text-light px-4 '> Register</button>
                    </div>


            </div>

        </form>
    </div>
  )
}
