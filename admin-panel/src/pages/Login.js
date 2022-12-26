import React, { useRef } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { loginAdmin, selectAdmin } from '../features/adminSlice'

const Login = () => {
  const dispatch = useDispatch()
  const admin = useSelector(selectAdmin)
  const errorRef = useRef()
  const navigate = useNavigate()
  const [input,setInput] = useState({
    email:'',
    password:''
  })
  const handleSubmit = async () =>{
    await dispatch(loginAdmin(input))
    if(admin.error.trim() !== ''){
      errorRef.current.innerText = admin.error
    } 
    navigate('/')
  }

  return (
    <div className={containerStyle}>
        <div className={formStyle}>
            <h2 className='text-center'>Login</h2>
            <div  ref={errorRef} className={errorStyle}></div>
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
            <button className={buttonStyle} onClick={handleSubmit}>Login</button>
            <p className='text-xs'>
              <Link to='/forgot-password'>Forgot Your password? </Link>
            </p>
            <p className='text-xs'>Dont have an account <Link to='/register' className='underline font-bold'>Register</Link></p>
        </div>
    </div>
  )
}

export default Login


// STYLE
const containerStyle = 'flex w-full h-screen border border-red border-solid items-center justify-center'
const buttonStyle = `w-full bg-slate-500 text-white px-10 py-1`
const errorStyle = `text-red-400`
const inputStyle = 'border-black border-solid focus:outline-none w-full px-3 py-2' 
const formStyle = "container border-black border-solid w-80 p-4 bg-black/10 backdrop-opacity-10 space-y-4"