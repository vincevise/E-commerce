import React from 'react'
import { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Products from '../components/Products'
import Users from '../components/Users'

const Admin = () => {


  return (
    <div className='flex' >
      <div className='w-1/5 h-screen bg-slate-500'>
        <Link to={'/admin/products'} >
          <div className={sideBarItems}>
            Products
          </div>
        </Link>
        <Link to={'/admin/users'} >
          <div className={sideBarItems}>
            Users
          </div>
        </Link>
      </div>
      <div className='w-4/5 h-screen bg-slate-100'>
      <Outlet />
      </div>
    </div>
  )
}

export default Admin

const sideBarItems = `w-full text-white hover:bg-slate-300 hover:text-slate-600 text-center cursor-pointer py-2`