import React, { useEffect } from 'react'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { selectCart } from '../featurs/cartSlice'
import { fetchProducts, selectProduct } from '../featurs/productSlice'

const Home = () => {
  const cartItems = useSelector(selectCart)
  const dispatch = useDispatch()
  const productState = useSelector(selectProduct)
  useEffect(()=>{
    if(productState.status === 'idle'){
      dispatch(fetchProducts())
    }
  },[])

 

  

  return (
    <div className='pt-28 px-10 bg-slate-50 pb-20'>
    <div className={sliderStyle}></div>
    <div className={cardGrid}>
      {productState.products.map((x)=>{
        return (
         <ProductCard item={x} key={x._id}/>
        )
      })}
    </div> 
    </div>
  )  
}

export default memo(Home)

const cardGrid = 'flex flex-wrap justify-center'
const addToCartStyle = 'w-full bg-slate-500 mt-2 rounded-full cursor-pointer font-medium text-white py-1 hover:bg-slate-800'
const sliderStyle = `border border-slate-200 h-80 mb-4 rounded mx-4 bg-slate-200 `