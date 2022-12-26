import React, { useEffect, useState } from 'react'
import { fetchProducts, selectProduct } from '../features/productSlice'
import AddProductForm from './AddProductForm'
import {useDispatch, useSelector} from 'react-redux'
import ProductTable from './ProductTable'

const Products = () => {
  const [modal,setModal] = useState(false)
  const {products,status,error} = useSelector(selectProduct)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(status == 'idle'){
      dispatch(fetchProducts())
    }
  },[])
  //  console.log(products)
  return (
    <>
      <div className='w-4/5 py-20 px-10'>
        <button 
          className={buttonStyle} 
          onClick={()=>setModal(!modal)}>Add Product
        </button>
        <ProductTable products={products}/>
      </div>
      {modal && 
      (<> <AddProductForm propState={{modal,setModal}} /> <div className={modalStyle} onClick={() => setModal(!modal)}></div></>)}
      
    </>
  )
}

export default Products

const buttonStyle = 'bg-green-600 px-4 py-2 rounded absolute right-5 top-5 text-white'
const formStyle ='w-96 h-80 absolute bg-slate-100 z-10 mx-auto my-auto left-0 right-0 top-0 bottom-0'
const modalStyle ='w-full h-full absolute bg-black/50'

