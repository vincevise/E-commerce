import React, { useContext, useRef } from 'react'
import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loginUser, selectAllUsers } from '../featurs/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Register from "../pages/Register"
import { fetchCart } from '../featurs/cartSlice'
import { SidebarContext } from '../App'
import {BsHandThumbsUp} from 'react-icons/bs'
import {AiOutlineArrowRight} from 'react-icons/ai'


const Login = ({setLogin}) => {
  let userState = useSelector(selectAllUsers)
  const navigate = useNavigate()
  const dispatch = useDispatch()  
  const location = useLocation()
  
  const {form,sidebar,setForm,setSidebar} = useContext(SidebarContext)

  const errorRef = useRef(null)
  const [input,setInput] = useState({
    email:'',
    password:''
  })

  const handeSubmit = async () =>{
     
    await dispatch(loginUser(input)) 
    await dispatch(fetchCart())
    if(location.pathname === '/login'){
      if(userState.authenticated) navigate('/checkout')
    }
    // setForm(false)
  }

 

  const formStyle = `${location.pathname === '/login' ? '' : 'fixed' } right-0 left-0 top-36 mx-auto w-8/12	max-w-xl flex border-red-100 border-solid items-center justify-center bg-white z-20 rounded-xl`
  

  return (
    <div className={formStyle}>
      {userState.authenticated 
        && 
      <div className="container flex flex-col items-center h-min-36 border-black border-solid p-4 space-y-4 ">
        <div><BsHandThumbsUp size={60}/></div>
        <div>Successfully LoggedIn</div>
        <button className='flex items-center gap-2 border border-slate-400 px-4 py-2 rounded-lg bg-slate-400 text-white font-semibold' onClick={()=>{setForm(false)}}>Proceed to Shop <AiOutlineArrowRight/></button>
      </div>}

        {!userState.authenticated && (<div className="container border-black border-solid   p-4   space-y-4 ">
            <h2 className='text-center'>Login</h2>
            <div ref={errorRef} className={errorStyle}>{userState.error}</div>
            <input 
                type="email" 
                className={inputStyle}
                placeholder='Email'
                value={input.email}
                name='email'
                onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}    
            />
            <input 
                type="password" 
                className={inputStyle}
                name='password'
                placeholder='Password'
                value={input.password}
                onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
            />
            <button className={buttonStyle} onClick={handeSubmit}>Login</button>
            <p className='text-xs'>
              <Link to='/forgot-password' onClick={()=>setForm(false)}>Forgot Your password? </Link>
            </p>
            <p className='text-xs'>Dont have an account <span onClick={()=>setLogin(false)}  className='underline font-bold cursor-pointer'>Register</span></p>
        </div>)}
    </div>
  )
}

export default Login

// STYLE
 const inputStyle = 'border-black border-solid focus:outline-none w-full px-3 py-2 text-base border border-slate-200 rounded-md	' 

const buttonStyle = `w-full bg-slate-500 text-white px-10 py-1 rounded-md`

const errorStyle = `text-red-400`