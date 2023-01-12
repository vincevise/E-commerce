import React, { useEffect } from 'react'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { selectCart } from '../featurs/cartSlice'
import { fetchProducts, selectProduct } from '../featurs/productSlice'
import {AiOutlineArrowLeft,AiOutlineArrowRight} from 'react-icons/ai'
import Image1 from '../../../images/slider/flash-sale-banner-template-design-600w-1555021556.webp'
import Image2 from '../../../images/slider/flash-sale-discount-banner-template-promotion-with-blue-and-yellow-color-abstract-background-simple-and-modern-design-template-for-use-element-brochure-poster-flyer-and-landing-page-vector.jpg'
import Image3 from '../../../images/slider/Free-Marketing-Product-Sale-Banner.webp'
import Image4 from '../../../images/slider/furniture-store-instagram-stories-template_23-2148795311.webp'
import { useState } from 'react'


const Home = () => {
  const cartItems = useSelector(selectCart)
  const dispatch = useDispatch()
  const productState = useSelector(selectProduct)
  useEffect(()=>{
    if(productState.status === 'idle'){
      dispatch(fetchProducts())
    }
  },[])

 const slider = [Image1,Image2,Image3]
 const [imageSlider,setSlider] = useState(0)
 const handlePrevious = () => {
    if(imageSlider === 0){
      setSlider( Number(slider.length - 1))
    }else{
      setSlider( imageSlider - 1)
    }
 }

 const handleNext = () => {
  if(imageSlider === (slider.length-1)){
    setSlider(0)
  }else{
    setSlider(imageSlider + 1)
  }
 }

  console.log(imageSlider)

  return (
    <div className=' pt-28 px-10 bg-slate-50 pb-20'>
    <div className={`relative border border-slate-200 h-96 mb-4 rounded-xl mx-4 bg-slate-300 overflow-hidden `} style={{backgroundImage:`url(${slider[imageSlider]})`,backgroundRepeat: 'no-repeat',backgroundSize:'cover',backgroundPosition:'center'}}>
      <div className='w-full absolute  flex justify-between [&_button]:border [&_button]:border-slate-600 [&_button]:p-3 [&_button]:rounded-full [&_button]:h-fit bottom-4  px-4 [&_button]:bg-slate-200/50'>
        
        <button className='hover:bg-white' onClick={handlePrevious}><AiOutlineArrowLeft size={15}/></button>
        <button className='hover:bg-white' onClick={handleNext}><AiOutlineArrowRight size={15}/></button>
      </div>
    </div>
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
 