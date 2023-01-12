import React, { useEffect } from 'react'
import { fetchUsers, selectAllUser } from '../features/userSlice'
import {useDispatch, useSelector} from 'react-redux'
import Cookies from 'js-cookie'
import UserTable from '../tables/UserTable'
const User = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUser)
  
 
  console.log(users.users)

  return (
    <div className='w-4/5 py-20 px-10 w-full'>
        <div className='my-4 mx-2'>Users</div>
        <UserTable/>
    </div>
  )
}

export default User

const thStyle = 'p-3'