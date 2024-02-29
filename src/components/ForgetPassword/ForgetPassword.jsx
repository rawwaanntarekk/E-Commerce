import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {

    const [EmailLabel, setEmailLabel] = useState(true);
    const [isLoading , setIsLoading] = useState(false);
    const [resetCodeLabel, setresetCodeLabel] = useState(true);
    let navigate = useNavigate();

//^ forget password logic 
    async function sendCode(){
        setIsLoading(true);
        let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        //body
        {
            email: formik.values.email
        
        }
        )
        setIsLoading(false);
        if (data.statusMsg === "success") {
            document.querySelector('.forgot-password').classList.add('d-none');
            document.querySelector('.verify-code').classList.remove('d-none');
        }

    }

//^ Hide label when input is empty and show it when it's not

    function ToggleLabel(e){
        if (e.target.value.length === 0 ) {
            if (e.target.name === 'email') {
                setEmailLabel(false);
            }

            else if (e.target.name === 'resetCode') {
                setresetCodeLabel(false);
            }
            }
        else{
            if (e.target.name === 'email') {
                setEmailLabel(false);
            }

            else if (e.target.name === 'resetCode') {
                setresetCodeLabel(false);
        }
    }
}

//^ formik for email input
    let formik = useFormik({
        initialValues:{
            email:''
                },
        onSubmit:sendCode,
        })
//^ verify code logic
async function checkCode(values){
    setIsLoading(true);
    let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
    setIsLoading(false);
    if (data.status === 'Success'){
        navigate('/resetPass')
    }
    
    

}


//^ formik for verify code input
let verifyCodeFormik = useFormik({
    initialValues:{
        resetCode:''
            },
    onSubmit:checkCode,
    })

return (
    <div className='pt-5 mt-5'>
    <form onSubmit={formik.handleSubmit} className='forgot-password'>
            <div className="row  gy-2 mx-auto my-3 ">
                <div className="col-sm-12 col-10 col-md-12 mx-auto  mb-4">
                    <h3 className='text-main mb-5'>Please enter your email</h3>
                    <label htmlFor="email" className={`${EmailLabel?"": "show-label"} text-main`} > Email</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} onInput={(e) => {ToggleLabel(e)}}type="email" name='email' id='email'  className=' form-control py-2' placeholder='Email' />
                    {formik.errors.email&& formik.touched.email? <p className='error'>{formik.errors.email}</p>:""}
                </div>

                <div className="col-sm-12 col-10 col-md-12 mx-auto ">
                <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light px-4 '> Send
                {isLoading ? <i className="fa-solid fa-spinner fa-spin mx-2"></i>:""}
                </button>
                    </div>
    </div>
    </form>
    <form onSubmit={verifyCodeFormik.handleSubmit} className={`verify-code d-none`}>
            <div className="row  gy-2 mx-auto my-3 ">
                <div className="col-sm-12 col-10 col-md-12 mx-auto  mb-4">
                    <h3 className='text-main mb-5'>Please enter the code sent to your email</h3>
                    <label htmlFor="email" className={`${resetCodeLabel?"": "show-label"} text-main`} > Reset Code</label>
                    <input onBlur={verifyCodeFormik.handleBlur} onChange={verifyCodeFormik.handleChange} onInput={(e) => {ToggleLabel(e)}}type="text" name='resetCode' id='resetCode'  className=' form-control py-2' placeholder=' Reset Code' />
                </div>

                <div className="col-sm-12 col-10 col-md-12 mx-auto ">
                <button disabled={!(verifyCodeFormik.isValid && verifyCodeFormik.dirty)} type='submit' className='btn bg-main text-light px-4 '> Verify
                {isLoading ? <i className="fa-solid fa-spinner fa-spin mx-2"></i>:""}
                </button>
                    </div>
    </div>
    </form>
    </div>
)
}

