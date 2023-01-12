import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import { getAllOrders } from '../api/api'
import {AiOutlineArrowDown,AiOutlineArrowUp,AiOutlineArrowLeft,AiOutlineArrowRight} from 'react-icons/ai'
import OrderTable from './OrdersTable'

const Analytics = () => {

  const {data,isLoading,isError,isFetching,isFetched} = useQuery('orders',getAllOrders)

  if(isLoading){
    return <div>Loading...</div>
  }

  if(isError){
    return <div>Error</div>
  }

  if(isFetching){
    return <div>Loading...</div>
  }

  if(isFetched){
    return (
      <div className='lg:w-4/5 sm:w-full   px-4 py-4 bg-slate-100 h-min-screen h-full'>
         <h1 className='my-2 mx-2 text-xl'>Orders</h1>
        <OrderTable data={data}/>
      </div>         
    
    )
  }

  
}

export default Analytics