import React from 'react'
import Form from '../components/Form'
import Login from './Login'

const LoginForm = () => {
  return (
    <div className='flex '>
        <div className='my-auto w-1/2'>
         <Form/>
        </div>
        <div className='w-1/2 border border-slate-300 h-screen bg-slate-300'>

        </div>
    </div>
  )
}

export default LoginForm