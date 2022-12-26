import React from 'react'
import { useDispatch } from 'react-redux'
import { decreaseQty, increaseQty, removeFromCart } from '../featurs/cartSlice'

const CartCard = ({item}) => {
    const {x,i} = item
    const dispatch = useDispatch()


    const handleQty = (e) => {
        (e.target.innerHTML ==='+') ? 
        dispatch(increaseQty(i)) : 
        ((x.qty == 1) ? dispatch(removeFromCart(x._id)) : dispatch(decreaseQty(i)))
    }
  return (
    <div  key={x._id} className={cardStyle}>
              <div className={imageContainerStyle}>
                <img className='max-w-full max-h-full' src={x.images[0]} alt="" />  
              </div>
              <div className={cardDetailsSection}>
                    <div>
                        <h2>{x.name.slice(0,90)}</h2>
                    <p>₹ <b>{x.price}</b></p>
                    </div>
                  
                  <div className={quantityBtnStyle}>
                    <button onClick={handleQty}>-</button>
                    <span className='text-xl'>{x.qty}</span>
                    <button onClick={handleQty}>+</button>
                  </div>
              </div>
            </div>
  )
}

export default CartCard

const quantityBtnStyle = 'w-28 flex border border-slate-500 justify-evenly align-bottom'

const cardDetailsSection = 'w-3/4 lg:2/3 px-3 py-2 relative flex-col justify-between flex'

const imageContainerStyle = 'w-1/4 h-40 p-2 flex items-center bg-white lg:w-1/3'

const cardStyle = 'w-full h-40 border border-slate-300 my-3 overflow-hidden flex'