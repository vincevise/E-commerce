import React, { useEffect } from 'react'
import { fetchUsers, selectAllUser } from '../features/userSlice'
import {useDispatch, useSelector} from 'react-redux'
import Cookies from 'js-cookie'
const User = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUser)
  
  // fetchUsers
  useEffect(()=>{
    if(users.status === 'idle'){
      dispatch(fetchUsers())
    }
  },[])
  console.log(users.users)

  return (
    <div className='w-4/5 py-20 px-10 w-full'>
      <table className='font-thin w-full'>
        <thead>
          <tr className='[&>th]:p-3 text-white bg-slate-500'>
            <th>Name</th>
            <th>Email</th>
            <th>roles</th>
          </tr>
        </thead>
        <tbody>
        {users.users?.map((cell)=>{
          return(<tr className='bg-slate-100 text-[14px]' key={cell._id}>
                  <th className={thStyle}>{cell.username}</th>
                  <th className={thStyle}>{cell.email}</th> 
                  <th className={thStyle}>{cell.roles}</th>
                </tr>)
        })}
        </tbody>
        </table>
    </div>
  )
}

export default User

const thStyle = 'p-3'