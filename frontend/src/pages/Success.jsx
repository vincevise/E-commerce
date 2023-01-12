import React from 'react'
import {BsFillHandThumbsUpFill} from 'react-icons/bs'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const Success = () => {
  return (
    <div className='border-6 border-black min-h-screen w-screen text-center relative'>
        <div className='absolute inset-0 m-auto w-fit h-fit z-0'>
            <div >
                <CheckCircleIcon sx={{fontSize:'200px'}} className='text-green-600 transition-all duration-150 ease-out hover:ease-in'/>
            </div>
            <p>Payment Successfull</p>
            <button>Proceed </button>
        </div>
    </div>
  )
}

export default Success 