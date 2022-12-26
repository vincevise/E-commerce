import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Register = ({setLogin}) => {
    // FUNCTIONS
    const navigate = useNavigate()
    const location = useLocation()
    const [input,setInput] = useState({
        username:'',
        email:'',
        password:''
    })

    const handleSubmit = async() => {
        // console.log(input)
        const response = await axios.post('http://localhost:7000/api/auth/register',input)
        if(response.statusText==='OK'){
            console.log(response.data)
            localStorage.setItem('token',response.data.token)
            navigate('/')
        }   
    }

    const formStyle = `${location.pathname === '/register' ? 'fixed' : '' } right-0 left-0 top-36 mx-auto w-8/12	max-w-xl flex border-red-100 border-solid items-center justify-center bg-white z-0 rounded-xl`


  return (
    <div className={formStyle}>
        <div className="container border-black border-solid   p-4  space-y-4 ">
            <h2 className='text-center'>Register</h2>
            <input 
                type="text" 
                className={inputStyle}
                placeholder='Username'
                name='username'
                value={input.username}
                onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
            />
            <input 
                type="email" 
                className={inputStyle} 
                placeholder='Email'
                name='email'
                value={input.email}
                onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
            />    
            <input 
                type="password" 
                className={inputStyle}
                name='password'
                value={input.password}
                onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
                placeholder='Password'
            />

             <button className={buttonStyle} 
                onClick={handleSubmit}>Signup</button>
            <p className='text-xs'>Alredy have an account <span onClick={()=>setLogin(true)} className='underline font-bold cursor-pointer'>Login</span></p>
        </div>
    </div>
  )
}

export default Register

// STYLE
 const inputStyle = 'border-black border-solid focus:outline-none w-full px-3 py-2 text-base border border-slate-200 rounded-md	' 

const buttonStyle = `w-full bg-slate-500 text-white px-10 py-1 rounded-md`

const errorStyle = `text-red-400`