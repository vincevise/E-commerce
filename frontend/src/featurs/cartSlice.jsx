import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk('cart/fetchCart',async ()=>{
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:7000/api/cart',{
        withCredentails:true,
        headers:{
        'Authorization':`Bearer ${token}` 
    }})
    return response.data
})

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        status:'idle',
        cart:[],
        error:null
    },
    reducers:{
        addToCart(state,action){
            let item = action.payload
            state.cart.push({...item,qty:1})
        },
        increaseQty(state,action){
           state.cart[action.payload].qty++
        },
        decreaseQty(state,action){
            state.cart[action.payload].qty--
        },
        removeFromCart(state,action){
            state.cart = state.cart.filter((x)=>x._id!==action.payload)
            
        }
    },extraReducers(builder){
        builder
            .addCase(fetchCart.pending,(state,action)=>{
                state.status = 'loading'
            })
            .addCase(fetchCart.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                console.log(action.payload)
                state.cart = action.payload.data
            })
            .addCase(fetchCart.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.error.message
            })

    }
})

export default cartSlice.reducer
export const selectCart = (state) => state.cart.cart
export const selectCartStatus = (state) => state.cart.status
export const {addToCart,increaseQty,decreaseQty,removeFromCart} = cartSlice.actions