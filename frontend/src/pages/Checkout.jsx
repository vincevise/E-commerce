import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCart } from "../featurs/cartSlice";

const Checkout = () => {
  const navigate = useNavigate()
  
  const [billingAddress,setBillingAddress] = useState({
    firstname:'',
    lastname:'',
    email:'',
    number:'',
    address:'',
    phone:''
  })

  const cartState = useSelector(selectCart);
  let totalCost = parseInt(cartState.reduce((tot, x) => tot + x.qty * x.price, 0),10)  ;
  let gst = Math.round((totalCost*18)/100)
  let finalCost = totalCost + gst + 100
  const handleSubmit = () => {
    const data = {
      totalCost,
      gst,
      finalCost
    }
    console.log(billingAddress)
    localStorage.setItem('address',JSON.stringify(billingAddress))
    sessionStorage.setItem('orderInfo',JSON.stringify(data))
    navigate('/payment')
  }

  return (
    <div className="flex scrollbarnone w-full lg:h-[37rem] pt-28 px-32 lg:flex-row sm:flex-col scrollbar-hide mb-20 gap-4">
      <div className="lg:w-2/3 sm:w-full px-4 py-4 overflow-auto scrollbar-hide bg-slate-100 mr-3 rounded-md ">
      <h1 className="font-semibold">Billing Address</h1>
        <div>
          
          <div className="grid grid-cols-2	gap-2 mt-2">
            <input 
              type="text" 
              placeholder="First Name" 
              className="px-2 py-2 outline-none rounded-md"
              name="firstname"
              value={billingAddress.firstname}
              onChange={(e)=>setBillingAddress({...billingAddress,[e.target.name]:e.target.value})}  
            />
            <input 
              type="text"  
              placeholder="Last Name" 
              className="px-2 py-2 outline-none  rounded-md"
              name="lastname"
              value={billingAddress.lastname}
              onChange={(e)=>setBillingAddress({...billingAddress,[e.target.name]:e.target.value})}  
              />
            <input 
              type="email" 
              placeholder="Email" 
              className="px-2 py-2 outline-none  rounded-md"
              name="email"
              value={billingAddress.email}
              onChange={(e)=>setBillingAddress({...billingAddress,[e.target.name]:e.target.value})}    
            />
            <input 
              type="number" 
              placeholder="Number" 
              className="px-2 py-2 outline-none  rounded-md"
              name="phone"
              value={billingAddress.phone}
              onChange={(e)=>setBillingAddress({...billingAddress,[e.target.name]:e.target.value})}
            />
          </div>
          <input 
            type="text" 
            placeholder="Address" 
            className="w-full mt-4 px-2 py-2 outline-none" 
            name="address"
              value={billingAddress.address}
              onChange={(e)=>setBillingAddress({...billingAddress,[e.target.name]:e.target.value})}    
          />
           
        </div>
        <div className="  grow overflow-auto flex flex-col grow auto ">
          <h2 className="mt-2 font-semibold">Your Cart Items</h2>
          {cartState.map((x) => { 
            return (
              <div className="flex my-3" key={x._id}>
                <div className="w-32 h-32 flex items-center  inline-block  shrink-0">
                  <img className={imgStyle} src={x.images[0]} alt="" />
                </div>
                <div className="inline-block px-2">
                  <h2>{x.name.slice(0, 25)}</h2>
                  <p>qty : {x.qty}</p>
                  <p>₹ {x.price} </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="lg:w-1/3 bg-white border border-slate-300 rounded-md h-auto flex flex-col h-fit">
        <h2 className="text-center mt-2">Order Summary</h2>
        <div className="px-4 pb-2 h-full ">
          <div className={billitemsStyle}>
            <span>Price:</span>
            <span>₹{totalCost}</span>
          </div>
          <div className={billitemsStyle}>
            <span>Delivery Charges:</span>
            <span>₹100</span>
          </div>
          <div className={billitemsStyle}>
            <span>GST:</span>
            <span>
              <b>₹{gst}</b>
            </span>
          </div>
          <hr />

          <div className={billitemsStyle}>
            <span>Total Price:</span>
            <span>
              <b>₹{finalCost}</b>
            </span>
          </div>
        </div>
        <button className=" w-fit mx-auto mb-4 rounded-md px-4 py-2 bg-gray-500 text-white " onClick={handleSubmit}>Proceed To Payment</button>
      </div>
    </div>
  );
};

export default Checkout;

const imgStyle = "max-w-full max-h-full ";

const billitemsStyle = "flex items-center justify-between mt-3 mb-2";
