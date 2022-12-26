import React, { useState } from 'react'
import { memo,useContext } from 'react';
import { BsSearch } from 'react-icons/bs';
import { BsBag,BsPerson } from 'react-icons/bs';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { SidebarContext } from '../App';
import { logout, selectAllUsers } from '../featurs/userSlice';
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import DropDownUser from './DropDownUser';
import { selectCart } from '../featurs/cartSlice';
import {GrClose} from 'react-icons/gr'


      
const NavBar1 = () => {  
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cartItems = useSelector(selectCart)
    let user = useSelector(selectAllUsers)

    const {sidebar,setSidebar,setForm} = useContext(SidebarContext)
    const [close,setClose] = useState(false)
    const [isLogged,setIsLogged] = useState(false)


    useEffect(()=>{
        setIsLogged(user.authenticated)
    },[user,dispatch])

    useEffect(()=>{

        const keypress = (e) => {
           console.log(e )
        }
        if(location.pathname==='/search'){
            window.addEventListener('keypress',keypress)            
        }
        return ()=> window.removeEventListener('keypress', keypress)
    },[location])
    
    const handleClick = () => {
        if(location.pathname !== '/search') navigate('/search')
        setClose(true)
    }
 
  return (
    <nav className={navBarStyle}>
        <Link to={'/'}><div className={logoStyle}>Logo</div></Link>
        <div className='flex items-center gap-x-4 mr-6'> 
                 <div className={searchBarStyle} onClick={handleClick}>
                    <BsSearch />
                    <input type="text" className={inputStyle} />
                    {location.pathname=='/search' && <GrClose className='transition-opacity	cursor-pointer' onClick={()=>navigate(-1)}/>}
                 </div>
            <div className={profileStyle}>
                
                <div className=''>
                    {user.username ? <span>Hi <b>{user.username}</b></span>: <span onClick={()=>setForm(true)}>Login</span> }
                </div>
                {user.authenticated && 
                <div className={dropdownStyle}>
                    <DropDownUser/>
                </div>}
                
            </div>
            <button className={buttonStyle} onClick={()=>setSidebar(true)}>
                <span className={cartStyle}>{cartItems?.length || 0}</span>
                <BsBag size={20}/>
            </button>
        </div>
    </nav>
  )
}

export default memo(NavBar1)


// STYLES
const cartStyle = 'absolute right-0 top-0 bg-black/75 text-white rounded-full w-5 text-sm'
const loginStyle = `absolute bottom-2 left-0 right-0 w-11/12 bg-slate-500 text-white mx-auto rounded-full`
const logoStyle = `text-2xl font-medium text-black-50`

const navBarStyle = `fixed w-screen    p-2 pl-5 flex justify-between items-center shadow-md bg-slate-50/50 backdrop-blur-lg`

const buttonStyle = `relative flex w-10 h-10 rounded-full items-center justify-center 
hover:bg-slate-100 active:bg-slate-300 active:transition duration-150 ease-in-out`

const profileStyle = `group cursor-pointer transition-all `

const dropdownStyle = `absolute w-48 h-auto top-15 right-4 bg-white invisible group-hover:visible border border-black text-center p-2 rounded-md`

const inputStyle = `w-28 ease-in-out duration-300 ml-2 focus:w-48 outline-none`

const searchBarStyle = `flex items-center bg-white px-2 py-1 border-black border-solid border rounded-md`