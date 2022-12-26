import axios from 'axios'
import React, { memo, useRef, useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import {GrClose} from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SidebarContext } from '../App'
import { fetchCart, selectCart, selectCartStatus } from '../featurs/cartSlice'
import { selectAllUsers } from '../featurs/userSlice'
import CartCard from './CartCard'

const Sidebar = () => {
  const cartState = useSelector(selectCart)
 
  const cartStatus = useSelector(selectCartStatus)
  const {sidebar,setSidebar} = useContext(SidebarContext)
  const sideBarRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userState = useSelector(selectAllUsers)

  useEffect(()=>{
    if(userState.authenticated)  dispatch(fetchCart())
    
  },[userState])

  const handleCheckout = () =>{
      console.log(userState)
    if(userState.authenticated){
      setSidebar(false)
      navigate('/checkout')
    }else{
      setSidebar(false)
      navigate('/login')
    } 
  }

  const handleClose = () => {
    setSidebar(false)
    console.log(cartState)
    if(userState.authenticated && cartState.length > 0) addToCart() 
  }

  const objectPick = (object,arr) =>{
    return object?.map((item)=> {
      const newObject = Object.keys(item)
          ?.filter(key => arr.includes(key))
          ?.reduce((acc, key) => { acc[key] = item[key];
                                  return acc;
                  }, {});
      return newObject
    })
  }

 

  


  const addToCart = async() =>{
    if(cartState.length > 0 ){

      await axios.post('http://localhost:7000/api/cart',{cart: objectPick(cartState,['_id','qty']),token:userState.token})
    } 
  }
  
 
  // console.log(cartState) 

  let totalCost =  cartState.reduce((tot,x)=>tot + (x.qty*x.price),0 ) 
    
  const sideBarstyle =`${sidebar ? 'w-full lg:w-1/3' : 'w-0'} fixed right-0 h-screen shadow-2xl bg-slate-50 duration-300 z-20 overflow-auto`

  const buttonStyle =`${sidebar ? 'block' : 'hidden'} flex w-10 h-10   rounded-full items-center justify-center ease-in-out hover:bg-slate-100 active:bg-slate-300 active:transition duration-150` 
  
  const sectionStyle = `${sidebar ? 'block' : 'hidden'} transition duration-150 mt-10 p-5 overflow-auto`

    
  return (
    <div  className={sideBarstyle} ref={sideBarRef}> 
    <div className='w-full h-30 z-20 fixed py-2 px-2 bg-slate-200/50 backdrop-blur-lg flex  '>
        <button className={buttonStyle} onClick={handleClose} >
            <GrClose size={20}/>
        </button> 
        <div className='flex mx-5 items-center relative w-96 justify-between'>
          <p>Total : ₹ <b>{totalCost}</b></p>
          {cartState.length >0 && <span onClick={handleCheckout}><button className='bg-black text-white font-bold px-10 py-2  mr-2 ml-auto' >Checkout</button></span>}
          
        </div>
    </div>
        
        
        <section className={sectionStyle}> 
          {cartState?.map((x,i)=>{
            return(<CartCard item={{x,i}} key={x._id}/>)
          })}
          
        </section>
         
    </div>
  )  
}

export default memo(Sidebar)