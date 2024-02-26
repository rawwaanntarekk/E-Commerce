import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext';





export default function Payment() {
    let {checkoutPayment,getCart} = useContext(cartContext);
    const [PhoneLabel, setPhoneLabel] = useState(true);
    const [cityLabel, setCityLabel] = useState(true);
    const [detailsLabel, setDetailsLabel] = useState(true);
    const [cartid, setCartid] = useState(null);

    useEffect(() => {
        (async ()=>{
        let {data} = await getCart();
        setCartid(data.data._id);
        
        })()
    })

    async function checkout(values){
        let {data} = await checkoutPayment(cartid , values);
        console.log(data);
        if (data.status === "success") {
            window.location = data.session.url;
        }

    }

    function checkEmpty(e){
        console.log(e.target.value.length);
        if (e.target.value.length === 0 ) {
            if (e.target.name === 'phone'){
                setPhoneLabel(false);
            }
            else if (e.target.name === 'city'){
                setCityLabel(false);
            }
            else if (e.target.name === 'details'){
                setDetailsLabel(false);
            }

        }else{
            if (e.target.name === 'phone'){
                setPhoneLabel(false);
            }
            else if (e.target.name === 'city'){
                setCityLabel(false);
            }
            else if (e.target.name === 'details'){
                setDetailsLabel(false);
            }
        }
    }

    useEffect(() => {
    } , [])

    
    let formik = useFormik({
        initialValues:{
            details:'',
            city:'',
            phone:'',
        },
            onSubmit:checkout,
            
        })
    

    
return (
    <div className='my-5 py-5'>
        <h1 className='text-main text-center my-5'>Checkout Form</h1>
        <form onSubmit={formik.handleSubmit} className='signin row  gy-2 mx-auto my-3'>
                <div className=" col-12 col-md-7 mx-auto  mb-4">
                    <label htmlFor="details" className={`${detailsLabel?"": "show-label"} text-main`} >Details </label>
                    <input onChange={formik.handleChange} onInput={(e) => {checkEmpty(e)}} type="text" name="details" id="details"  className='form-control py-2 ' placeholder='Details' />
                </div>
                <div className=" col-12 col-md-7 mx-auto  mb-4">
                    <label htmlFor="city" className={`${cityLabel?"": "show-label"}  text-main`} >City</label>
                    <input  onChange={formik.handleChange} onInput={(e) => {checkEmpty(e)}} type="text" name="city" id="city"  className='form-control py-2 ' placeholder='City'/>
                </div>
                <div className="col-12 col-md-7 mx-auto  mb-4">
                    <label htmlFor="phone" className={`${PhoneLabel?"": "show-label"} text-main`}> Phone</label>
                    <input  onChange={formik.handleChange}  onInput={(e) => {checkEmpty(e)}} type="tel" name='phone' id='phone'  className=' form-control py-2' placeholder='Phone' value={formik.values.phone} />
                </div>


                
                <div className="col-12 col-md-7 mx-auto   text-end">
                    <button  type='submit' className='btn bg-main text-light px-4 '> Pay
                    {/* {isLoading ? <i class="fa-solid fa-spinner fa-spin mx-2"></i>:""} */}
                    </button>
                </div>



        </form>
    </div>
  )
}
