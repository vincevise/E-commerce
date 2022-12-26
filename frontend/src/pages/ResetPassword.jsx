import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const [input,setInput] = useState({password:'',confirmpassword:''})
    const errorRef = useRef(null)
    const param = useParams()
    const [success,setSuccess] = useState(false)

    const handleClick = async() => {
        const {token} = param
        const {password,confirmpassword} = input
        if(password !== confirmpassword){
            errorRef.current.innerText = 'password do not match'
        }else{
            console.log('logged')
            const response = await axios.post(`http://localhost:7000/api/auth/reset-password/${token}`,input)
            if(response.statusText == "OK"){
                setSuccess(true)
            }
        }
    }

    useEffect(()=>{
        setSuccess(false)
    },[])

  return (
    <div className="flex ">
      <div className="my-auto w-1/2 box-border text-center">
        {
            success ? <h1 className="text-blue-300">Password changed successfully</h1> : 
            <>
                <h1>Change Password</h1>
                <input 
                    className={inputStyle} type="password" 
                    placeholder="Password"
                    name="password"
                    onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} 
                    value={input.password}   
                />
                <input 
                    className={inputStyle} type="password" 
                    placeholder="Confirm Password"
                    name="confirmpassword"
                    value={input.confirmpassword}
                    onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
                />
                <div ref={errorRef} className='text-red-500 mt-2'></div>
                <button className={buttonStyle} onClick={handleClick} >Submit</button>
            </>
        }
        
      </div>
      <div className="w-1/2 border border-slate-300 h-screen bg-slate-300"></div>
    </div>
  );
};

export default ResetPassword;

const inputStyle =
  "border-black border-solid focus:outline-none px-3 py-2 text-base border border-slate-400 rounded-md mt-3";

  const buttonStyle ='block mx-auto mt-4 border px-8 py-2 rounded-md border-slate-400 bg-slate-400 text-white font-semibold' 
