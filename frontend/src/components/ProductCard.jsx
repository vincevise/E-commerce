import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart, selectCart } from '../featurs/cartSlice'

const ProductCard = ({item}) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCart)
  const handleAdd = () =>{
    dispatch(addToCart(item))
  }

  const handleRemove = () => {
    dispatch(removeFromCart(item._id))
  }

  return (
    <div className={productCard}> 
    <Link to={`/products/${item._id}`}>
      <div className='mx-2 my-2 flex justify-center '>
        
        <img className='max-w-full max-h-full' src={item.images[0]} alt="" /> 
      </div>
      {/* <p className='font-bold mt-2'>{item.name.slice(0,20)}</p>
      <p>₹ <b>{item.price}</b> </p> */}
    </Link>
    <div>
    <p className='font-bold mt-2'>{item.name.slice(0,20)}</p>
      <p>₹ <b>{item.price}</b> </p>
      {cartItems.some((x)=>x._id === item._id)
        ? 
        <button className={addToCartStyle} onClick={handleRemove}>Remove From Cart</button> : 
        <button className={removeFromCartStyle} onClick={handleAdd}>Add To Cart</button>
      }
    </div>
      
      
    </div>
  )
}

export default ProductCard

const productCard = 'flex flex-col h-42 justify-between items-center border w-60  rounded-xl p-2 m-1 cursor-pointer bg-white'
const addToCartStyle = 'w-full bg-slate-500  rounded-md cursor-pointer font-medium text-white py-1 mt-2 hover:bg-slate-800  px-10 mt-2 border-slate-500 border'
const removeFromCartStyle = 'w-full border-black border text-black rounded-md cursor-pointer font-medium text-white py-1 hover:bg-slate-400 px-16 mt-2' 