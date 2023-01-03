import React from 'react'
import { useLocation } from 'react-router-dom'

const Footer = () => {
    const location = useLocation()
    console.log(location.pathname)
    if(location.pathname == '/search') return
  return (
    <div className='text-center h-16 absolute bottom-0 w-full bg-slate-600'>
    </div>
  )
}

export default Footer