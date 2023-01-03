import React, { useRef } from 'react'
import {GrStripe,} from 'react-icons/gr'
import {BsFillCreditCard2BackFill} from  'react-icons/bs'
import {SlCalender} from 'react-icons/sl'
import {FaKey} from 'react-icons/fa'
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../featurs/userSlice'
import { useNavigate } from 'react-router-dom'


const Payment = () => {
    const stripe = useStripe()
    const elements = useElements()
    const payBtn = useRef()
    const navigate = useNavigate()
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    console.log(orderInfo)
    const userState = useSelector(selectAllUsers)
    console.log(userState)
    const shippingInfo = JSON.parse(localStorage.getItem('address'))
    console.log(shippingInfo)
    const submitHandler = async(e) => {
        e.preventDefault()
        payBtn.current.disabled = true
        try{
            const config = {
                headers: {
                  "Content-Type": "application/json",
                },
              };
            const {data} = await axios.post('http://localhost:7000/api/payment/process',{amount:orderInfo.finalCost*100} )

            const client_secret = data.client_secret

            if(!stripe || !elements) return

            const result = await stripe.confirmCardPayment(client_secret,{
                payment_method:{
                    card:elements.getElement(CardNumberElement),
                    billing_details:{
                        name:userState.username,
                        email:userState.email,
                        address:{
                            line1:shippingInfo.address,
                            city:shippingInfo.city,
                            state:shippingInfo.state,
                            postal_code:shippingInfo.pinCode,
                            country:shippingInfo.country
                        }
                    }
                }
            })
            console.log(result)

            if(result.error){
                payBtn.current.disabled = false
                console.log(result.error)
                alert(result.error.message)
            } else {
                if(result.paymentIntent.status ==='succeeded'){
                   navigate("/success") 
                }else{
                    alert('There is some error while processing payment')
                }
            }

        }catch(error){
            payBtn.current.disabled = false
            console.log(error)
            alert(error.response.data.message)
        }
    }
  return (
    <div className='w-full h-screen '>
        <form onSubmit={(e)=>submitHandler(e)} className='  mx-auto my-auto w-96  h-screen pt-20 text-center'> 
        <div className='pt-20 '>

            <p className='m-2 p-2 font-bold'>Card Info</p>
            <div className='flex border border-slate-300 p-2 m-2 rounded-lg'> 
                <BsFillCreditCard2BackFill/>
                 <CardNumberElement className='pl-4 w-full '/> 
            </div>
            <div className='flex border border-slate-300 p-2 m-2 rounded-lg'>    
                <SlCalender />
                <CardExpiryElement className='pl-4 w-full'/>
            </div>
            <div className='flex border border-slate-300 p-2 m-2 rounded-lg'>
                <FaKey/>
                <CardCvcElement className='pl-4 w-full'/>
            </div>
        </div> 
        <input 
            type="submit" 
            value={` Pay ₹ ${orderInfo && orderInfo.finalCost} `}
            ref={payBtn}
            className='bg-blue-500 px-4 py-2 text-white rounded-lg'
        />
        </form>
    </div>
  )
}

export default Payment