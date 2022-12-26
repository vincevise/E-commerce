import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectProduct } from '../featurs/productSlice'
import Slider from "react-slick";
import './productDetails.css'
import { BsBag } from 'react-icons/bs';
import {GoStar} from 'react-icons/go'
import { useState } from 'react';
import { addToCart, removeFromCart, selectCart } from '../featurs/cartSlice';

const ProductDetails = () => {

    const {id} = useParams()
    const cartItems = useSelector(selectCart)
    const {products} = useSelector(selectProduct)
    
    const dispatch = useDispatch()
    
    const product = products?.find((x)=>x._id===id)
    const [sliderImage,setSliderImage] = useState(0)
    
    const handleAdd= () => {
        dispatch(addToCart(product))
    }

    const handleRemove = () => {
        dispatch(removeFromCart(id))
    }
    
  return (
    <div className='pt-20 mb-4 px-6 flex flex-col lg:flex-row lg:mb-0'>
        
        <div className={sliderContainer}>
            <div className='w-full border border-slate-200'>
                <img src={product.images[sliderImage]} alt="" />
            </div>  
            <div className='flex inline-block mb-6 md:w-full '> 
                {product.images.map((x,i)=>{
                    return (
                        <div className={smallSlide} onClick={()=>setSliderImage(i)} key={i}>
                            <img src={x} alt="" />
                        </div>
                    )
                })}
            
            </div>
            
        </div>
        <div className={productDetails}>
            <h1 className='text-2xl mb-2'>{product.name}</h1>
            <span className='border flex items-center border-black px-2 mb-2 w-14 justify-between'>4.5 <GoStar/></span>
            <span className='text-3xl'>₹ <b>{product.price}</b></span>
            <p className='mt-2'>
                {product.description}
            </p>
            <div className='mt-4 flex'>
                {cartItems.some((x)=>x._id === id)
                     ? 
                    <button className={removeFromCartStyle} onClick={handleRemove}>Remove From Cart</button> : 
                    <button className={addToCartStyle} onClick={handleAdd}>Add to Cart <BsBag/></button>
                }
                
               
            </div>
            
        </div>
        
    </div>
  )
}

export default ProductDetails

const sliderContainer = 'w-full lg:gap-2 lg:w-1/3 '
const productDetails = 'w-full px-4 lg:w-2/3'
const smallSlide = 'h-20 w-20 inline-block flex items-center justify-center p-1 opacity-25 hover:opacity-50 cursor-pointer'
const addToCartStyle='border border-black px-6 py-2 font-bold text-lg mr-4 rounded flex items-center gap-2 hover:bg-slate-300'
const removeFromCartStyle='bg-black px-6 py-2 font-bold text-lg text-white mr-4 rounded flex items-center gap-2 hover:bg-black/80'
const buttonStyle = 'border border-slate-600 px-6 py-2 font-bold text-lg bg-slate-600 text-white rounded hover:bg-slate-700'