import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'

const Form = () => {

    const[login,setLogin] = useState(true)
    const location = useLocation()

    const arr = ['/login','/register']
   

    const formStyle = `${arr.includes(location.pathname) ? '' : 'fixed'} right-0 left-0 top-36 w-9/12   mx-auto  border-red-100 border-solid items-center justify-center   bg-white text-center`
  return (
    <div
    className={formStyle}
    >
        {login ? <Login setLogin={setLogin}/> : <Register setLogin={setLogin}/>}
    </div>
  )
}

export default Form