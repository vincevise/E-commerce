import {format} from 'date-fns'
import {BsThreeDots} from 'react-icons/bs'

export const ORDERCOLUMNS = [
    
    {
        Headers:'Name',
        accessor:'user',
        Cell:({row})=>(
            <div className='flex items-center gap-2'>
                <div className='w-10 rounded-full overflow-hidden'>
                    <img src={row.original.user.photo} alt="" className='w-max-full'/>
                </div>
                <div>
                    {row.original.user.username}
                </div>
            </div>
        )
    },
    {
        Headers:'Price',
        accessor:'bill',
        Cell:({value})=>(
            <>
               ₹ {value.totalCost}
            </>)
        
    },
    {
        Headers:'Address',
        accessor:'shippingInfo',
        Cell:({value})=>(
            <>
               {value.address}
            </>)
        
    },
    {
        Headers:'Date',
        accessor:'date',
        Cell:({value})=>{return format(new Date(value),"yyyy-MM-dd")}
    },
    {
        Headers:'Status',
        accessor:'status',
        Cell:({value})=>
        {
            var style = `inline px-3 py-1 rounded-full text-md ${(value === 'processing') ? 'bg-orange-200	text-orange-800 ' :''}`
            return (
            <div className={style}>{value}</div>
            )
        }
    },
    {
        Headers:'Action',
        accessor:'_id',
        Cell:()=>{return <div className='cursor-pointer flex justify-center'> <BsThreeDots size={20}/> </div> }
    }  
]