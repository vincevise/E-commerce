import React from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const location = useLocation()
    if(location.pathname === '/login'){
        return
    }
  return (
    <div className={containerStyle}>
        <Link to={'/'}>
            <div className={location.pathname==='/' ? selected : unselected}>Analytics</div>
        </Link>
        <Link to={'/users'}>
            <div className={location.pathname==='/users' ? selected : unselected}>Users</div>
        </Link>
        <Link to={'/products'}>
            <div className={location.pathname==='/products' ? selected : unselected}>Products</div>
        </Link>
        
    </div>
  )
}

export default Sidebar

const containerStyle = 'w-1/5 h-11/12 bg-slate-800 text-white text-center'

const unselected = 'cursor-pointer hover:text-black hover:bg-slate-400 py-2'
 
const selected = 'cursor-pointer text-black bg-slate-100 py-2'