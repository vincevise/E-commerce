import React, { memo, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout, selectAllUsers } from '../featurs/userSlice'

const DropDownUser = () => {
    const [isLogged,setIsLogged] = useState(false)
    const dispatch = useDispatch()
    let user = useSelector(selectAllUsers)
    const navigate = useNavigate()
       
    const handleLogout = async() => {
        await localStorage.clear()
        await dispatch(logout())
        navigate('/')
    }

    useEffect(()=>{
        console.log(user)
        setIsLogged(user.authenticated)
        
    },[user,dispatch])

  return (
    <div className='w-fit px-4 '>
         {user.authenticated ? 
            <> 
                
                <div className='w-30 h-30 bg-slate-200 rounded-full overflow-hidden'>
                    <img src={user.photo} className='w-max-full h-max-full' alt="" />
                </div>
                <div>{user.username}</div>
                <Link to={`/user/${user.username}`}>
                    <button className='my-2 w-15 border border-slate-600 px-5 rounded-full text-black hover:bg-slate-200'>
                        View profile
                    </button> 
                </Link>
                <button className={loginStyle} onClick={handleLogout}>Log out</button>
            </> 
            : 
            <>
                <Link to='/login'><button className={loginStyle}>Log in</button></Link>
            </>}
    </div>
  )
}

export default memo(DropDownUser)

const loginStyle = ` bottom-2 left-0 right-0 w-11/12 bg-slate-500 text-white mx-auto rounded-md my-2`