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
import { useEffect } from 'react';
import { fetchReviews, postReview, selectReview } from '../featurs/reviewSlice';
import Rating from '@mui/material/Rating'
import {CgProfile} from 'react-icons/cg'
import {BsPersonCircle} from 'react-icons/bs'
import { selectAllUsers } from '../featurs/userSlice';

 


const ProductDetails = () => {
    const {id} = useParams()
    const cartItems = useSelector(selectCart)
    const reviewState = useSelector(selectReview)
    const {products} = useSelector(selectProduct)
    const userState = useSelector(selectAllUsers)
    const [modal,setModal] = useState(false)
    const [rating,setRating] = useState(0)
    const [review,setReview] = useState('')
    const dispatch = useDispatch()
    
    const product = products?.find((x)=>x._id===id)
    const [sliderImage,setSliderImage] = useState(0)
    
    useEffect(()=>{
        dispatch(fetchReviews(id))
    },[])

    const handleAdd= () => {
        dispatch(addToCart(product))
    }

    const handleRemove = () => {
        dispatch(removeFromCart(id))
    }

    const handleSubmit = () => {
        const data = {
             rating,
             review,
            product:id,
            email:userState.email
        }
        dispatch(postReview(data)).then(()=>setModal(false))
    }
    console.log(reviewState)
  return (
    <div className='pt-28 px-6 pb-28 flex flex-col lg:flex-row lg:mb-0'>
        
        <div className={sliderContainer}>
            <div className='w-full border border-slate-200'>
                <img src={product?.images[sliderImage]} alt="" />
            </div>  
            <div className='flex inline-block mb-6 md:w-full '> 
                {product.images.map((x,i)=>{
                    return (
                        <div className={smallSlide} onClick={()=>setSliderImage(i)} key={i}>
                            <img className='' src={x} alt="" />
                        </div>
                    )
                })}
            
            </div>
            
        </div>
        <div className={productDetails}>
            <h1 className='text-2xl mb-2'>{product.name}</h1>
            <span className='border flex items-center border-black px-2 mb-2 w-14 justify-between'>4.5 <GoStar/></span>
            <span className='text-3xl'>₹ <b>{product.price}</b></span> 
            <div className='my-3'>{product.category.map((x,i)=><Link to={`/${x.name}`} className='inline-block px-3 py-1 font-medium rounded-md bg-slate-500 text-white' key={i}>{x.name}</Link>)}</div>
            <p className='mt-2'>
                {product.description}
            </p>
            <div className='my-4 flex '>
                {cartItems.some((x)=>x._id === id)
                     ? 
                    <button className={removeFromCartStyle} onClick={handleRemove}>Remove From Cart</button> : 
                    <button className={addToCartStyle} onClick={handleAdd}>Add to Cart <BsBag/></button>
                }
            </div>
            <hr />
            <div className=' mt-4 ml-2 '>
                <h1 className='mb-2 text-lg font-bold	'>Reviews</h1>
                {reviewState.reviews?.map((x)=>{
                    return (<div className='p-2' key={x._id}>
                        <div className='flex items-center gap-2'>
                            <span><BsPersonCircle className='fill-gray-400' size={30}/></span>
                            <span>
                                {x.user.username}
                            </span>
                            </div>
                        <Rating className='mt-2' name="read-only" value={x.rating} readOnly size='small'/>
                        <p>{x.review}</p>
                    </div>)
                })}
            </div>
            <div className='text-center'>
                <button className={writeReviewStyle} onClick={()=>setModal(true)}>Write a Review</button>
                {modal 
                    &&
                    <>
                        <div className='flex flex-col items-center bg-white  w-fit px-10 pb-16 pt-4 h-fit fixed inset-0 my-auto mx-auto z-10  rounded-md'>
                            <Rating className='mb-2' onChange={(event,newValue)=>setRating(newValue)} value={rating}/>
                            <textarea name="" id="" cols="30" rows="8" className={textAreaStyle}onChange={(e)=>setReview(e.target.value)}></textarea>
                            <button className={submitReviewStyle} onClick={handleSubmit}>Submit Review</button>
                        </div>
                        <div className='bg-black/50 w-full h-full fixed inset-0 my-auto mx-auto' onClick={()=>setModal(false)}>
                            
                        </div>
                    </>
                }
            </div>
        </div>
        
    </div>
  )
}

export default ProductDetails

const sliderContainer = 'w-full lg:gap-2 lg:w-1/3 '
const productDetails = 'w-full px-4 lg:w-2/3'
const smallSlide = 'h-20 w-20 inline-block flex items-center justify-center p-1   cursor-pointer'
const addToCartStyle='border border-black px-6 py-2 font-bold text-lg mr-4 rounded flex items-center gap-2 hover:bg-slate-300'
const removeFromCartStyle='bg-black px-6 py-2 font-bold text-lg text-white mr-4 rounded flex items-center gap-2 hover:bg-black/80'
const buttonStyle = 'border border-slate-600 px-6 py-2 font-bold text-lg bg-slate-600 text-white rounded hover:bg-slate-700'
const writeReviewStyle = 'border border-black px-4 py-2 mt-2 rounded-md hover:bg-slate-200'
const submitReviewStyle = 'w-40 bg-black rounded-md text-white py-2 px-4 absolute bottom-4 inset-x-0 m-auto'
const textAreaStyle = 'border border-black rounded-md p-2'