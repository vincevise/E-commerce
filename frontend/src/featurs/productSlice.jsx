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

 

const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{

    }
    ,extraReducers(builder){
        builder 
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
    }
})

export default productSlice.reducer
export const selectProduct = (state) => state.products