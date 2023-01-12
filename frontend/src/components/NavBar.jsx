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
import axios from 'axios'
import { addSearch, removeSearch } from '../featurs/searchSlice';
import { Routes, Route, useParams } from 'react-router-dom';

      
const NavBar = ( ) => {  
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cartItems = useSelector(selectCart)
    let user = useSelector(selectAllUsers)

    const {sidebar,setSidebar,setForm} = useContext(SidebarContext)
    const [close,setClose] = useState(false)
    const [isLogged,setIsLogged] = useState(false)
    const [search,setSearch] = useState('')
    const [categories,setCategories] = useState([])
    const params = useParams()
    useEffect(()=>{
        setIsLogged(user.authenticated)
    },[user,dispatch])
    
    const fetchCategories = async () => {
        await axios.get('http://localhost:7000/api/category').then((res)=>setCategories(res.data.data))
    }

    useEffect(()=>{
        fetchCategories()
    },[])

    useEffect(()=>{
        const keypress = async(e) => {
           if(e.key === 'Enter'){
                console.log(search)
                navigate({
                    pathname:'/search',
                    search:`?${search}`
                })
                await axios.get(`http://localhost:7000/api/product/search/${search}`).then((res)=>dispatch(addSearch(res.data.data)))
           }
        }
        if(location.pathname==='/search'){
            window.addEventListener('keypress',keypress)            
        }
        return ()=> window.removeEventListener('keypress', keypress)
    },[search])

    useEffect(()=>{
        if(location.pathname !== '/search'){
            dispatch(removeSearch())
            setSearch('')
        } 
    },[location])
    
    
    const handleClick = () => {
        if(location.pathname !== '/search') navigate('/search')
        setClose(true)
    }

    const handleClose = async() => {
        setSearch('')
        await navigate('/')
    }

  return (
    <nav className='fixed shadow-md bg-slate-50/50 backdrop-blur-lg z-10'>
    <div className={navBarStyle}>
        <Link to={'/'}><div className={logoStyle}>Logo</div></Link>
        <div className='flex items-center gap-x-4 mr-6'> 
                 <div className={searchBarStyle}>
                    <BsSearch  onClick={handleClick} />
                    <input 
                        type="text" 
                        className={inputStyle} 
                        onChange={(e)=>setSearch(e.target.value)}
                        onClick={handleClick}
                        value={search}
                    />
                    {location.pathname=='/search' && <GrClose className='transition-opacity	cursor-pointer' onClick={handleClose}/>}
                 </div>
            <div className={profileStyle}>
                
                <div className=''>
                    {user.username ? 
                        <div className='flex items-center'>
                            <span className='w-10 h-10 p-1 bg-slate-300 rounded-full mx-2'>
                                <img src={user.photo} className='w-max-full h-max-full' alt="" />
                            </span>
                            <span>
                                Hi <b>{user.username}</b>
                            </span>
                        </div>
                        : 
                        <span onClick={()=>setForm(true)}>Login</span> }
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
         
    </div>
    <div className='border border-slate-400 flex justify-evenly items-center bg-white'>
        {categories.map((x)=>{
            
        return (<Link 
            to={`/category/${x.name}`} 
            key={x._id} 
            className='py-2 hover:bg-slate-200 w-full text-sm text-center cursor-pointer'>
                <span className='' >{x.name}</span>
            </Link>)})}
    </div>
    </nav>
  )
}

export default memo(NavBar)


// STYLES
const cartStyle = 'absolute right-0 top-0 bg-black/75 text-white rounded-full w-5 text-sm'
const loginStyle = `absolute bottom-2 left-0 right-0 w-11/12 bg-slate-500 text-white mx-auto rounded-full`
const logoStyle = `text-2xl font-medium text-black-50`

const navBarStyle = ` w-screen  p-2 pl-5 flex justify-between items-center `

const buttonStyle = `relative flex w-10 h-10 rounded-full items-center justify-center 
hover:bg-slate-100 active:bg-slate-300 active:transition duration-150 ease-in-out`

const profileStyle = `group cursor-pointer transition-all `

const dropdownStyle = `absolute w-48 h-auto top-15 right-4 bg-white invisible group-hover:visible border border-black text-center p-2 rounded-md shadow-2xl	`

const inputStyle = `w-28 ease-in-out duration-300 ml-2 focus:w-48 outline-none`

const searchBarStyle = `flex items-center bg-white px-2 py-1 border-black border-solid border rounded-md`
 