import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import Form from '../components/Form'

const ForgetPassword = () => {
  const [email,setEmail] = useState('')
  const [successes,setSuccesses] = useState(false) 
  useEffect(()=>{
    setSuccesses(false)
  },[])
  const errorRef = useRef(null)
  const buttonRef = useRef(null)
  const handleClick = async() =>{
    if( /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)){
      try{
        const response = await axios.post("http://localhost:7000/api/auth/forget-password",{email:email})
        if(response.statusText == "OK") setSuccesses(true)
      }catch(error){
        errorRef.current.innerHTML = error.message
      }
    }else{
      errorRef.current.innerHTML = 'Invalid Email'
    }
  }
  return (
    <div className='flex '>
        <div className='my-auto w-1/2 box-border text-center'>
            {successes ? <div className='text-blue-500 mt-2'>Verification Email sent, Please Check your mail</div> 
            : 
            <>
              <h1>Enter Email Id/ Username</h1>
              <input 
               className={inputStyle} 
                value={email}
                onChange={(e)=>setEmail(e.target.value)} 
                type="text" />
              <div ref={errorRef} className='text-red-500 mt-2'></div>
              <button className={buttonStyle} ref={buttonRef} onClick={handleClick}>Submit</button>
            </>}
           
            
        </div>
        <div className='w-1/2 border border-slate-300 h-screen bg-slate-300'>
        </div> 
       
    </div>
  )
}

export default ForgetPassword

const inputStyle = 'border-black border-solid focus:outline-none px-3 py-2 text-base border border-slate-400 rounded-md mt-3' 

const buttonStyle ='block mx-auto mt-4 border px-8 py-2 rounded-md border-slate-400 bg-slate-400 text-white font-semibold' 