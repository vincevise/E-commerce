import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProduct, getUserOrders } from '../api/api'
import { selectAllUsers } from '../featurs/userSlice'
import { useQuery } from "react-query";
import {format} from 'date-fns'
import { selectProduct } from '../featurs/productSlice'


const UserDetails = () => {
  const {user} = useParams()
  const {username,email,photo} = useSelector(selectAllUsers)
  const {products} = useSelector(selectProduct)
  console.log(products, 'products')
  const {data,isLoading,isError} = useQuery("orders", ()=>getUserOrders(user))
  const [orders,setOrders] = useState({})
 
  let content;
  if(isLoading) {
    content = (<div>Loading...</div>)
  }

  if(isError){
    content = (<div>Error</div>)
  }

 

  if(data){
    if(data.orders.length === 0){
      content = (<div>No Previous Orders</div>)
    }else{
      
    
    content = (data.orders.map((x)=>{
      return (
        <div key={x._id} className='border border-slate-400 w-full text-sm rounded-lg'>
          <div className='flex justify-between [&_span]:flex-col [&_span]:text-center [&_p]:text-black [&_p]:text-[13px] [&_span]:text-slate-800 bg-slate-200 px-4 py-3 border-b border-slate-400 rounded-lg rounded-b-none'>
            <span>
              <p>ORDER PLACED</p>
              <span>{format(new Date(x.date),"dd-MM-yyyy")}</span>
            </span>
            <span>
              <p>TOTAL COST</p>
              <span>₹ {x.bill.totalCost}</span>
            </span>
            <span>
              <p>SHIP TO</p>
              <span>{x.shippingInfo.firstname + " "+  x.shippingInfo.lastname}</span>
            </span>
            <span>
              <p>ORDER NO:</p>
              <span>{x._id}</span>
            </span>
          </div>
          <div>
            {x.products.map((product)=>{
              const data = products.find((x)=>x._id === product._id)
              return <div className='w-full px-3 py-3'>
                
                <div className='flex items-center justify-between '>
                  <div className='flex items-center gap-2'>

                  <img src={data.images[0]} className='w-20' alt="" />
                  <span>{data.name}</span>
                  </div>
                  <p>Quantity: {product.qty}</p>
                </div>
              </div>
            })}
          </div>
        </div>
      )
    }))}
  }
  
  console.log(data)
  const colors = ['red','green','yellow','blue','orange']
  const color = colors[ Math.floor(Math.random()*(colors.length))]
  console.log(orders)
  return (
    <div className='pt-28 px-16 lg:px-20 flex flex-wrap  '>
      <div className='lg:w-1/3 flex flex-col justify-center   items-center '>
        <img src={photo} alt="" className={`bg-${color}-300 rounded-full mb-6`}/>
        <div className='flex flex-wrap lg:flex-col  [&_div]:flex [&_div]:justify-between  [&_input]:bg-slate-100  [&_div]:gap-2 gap-2'>
          <div className=''>
            <label htmlFor="username" >Username</label>
            <input 
                id='username'
                name='username'
                type="text" 
                className=' mx-2 px-1  inline ' 
                defaultValue={username}
                />
          </div>
          <div >
            <label htmlFor="username">Email</label>
            <input 
                id='email'
                name='email'
                type="text" 
                defaultValue={email} 
                className='mx-2 px-1'
                />
          </div>
        </div>
    
      </div>
       
      <div className='flex flex-wrap lg:w-2/3 justify-center  px-2 py-4 w-full gap-3'>
          {content}
      </div>
    </div>
  )
}

export default UserDetails