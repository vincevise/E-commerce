import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products:[],
    status:'idle',
    error:null
}

export const fetchProducts = createAsyncThunk('products/fetchProducts',async () =>{
    const response = await axios.get('http://localhost:7000/api/product/getProducts')
    return response.data
})

export const postProducts = createAsyncThunk('products/postProducts',async (product) =>{
    const response = await axios.post('http://localhost:7000/api/product/create',product)
    return response.data
})

export const deleteProduct = createAsyncThunk('products/deleteProduct',async (product) =>{
    const response = await axios.delete(`http://localhost:7000/api/product/deleteProduct/${product}`)
    return response.data
})

const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{

    }
    ,extraReducers(builder){
        builder
            .addCase(postProducts.fulfilled,(state,action)=>{
                console.log(action.payload)
                state.products.push(action.payload.data)
            }) 
            .addCase(fetchProducts.pending,(state,action)=>{
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.products = action.payload.data
            })
            .addCase(fetchProducts.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.error.message
            }) 
            .addCase(deleteProduct.fulfilled,(state,action)=>{
                const id = action.payload.data._id
                console.log(action.payload.data)
                state.products = state.products.filter((x)=>x._id !== id)
            })
    }
})

export default productSlice.reducer
export const selectProduct = (state) => state.products