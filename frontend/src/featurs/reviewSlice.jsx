import axios from "axios"

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { selectAllUsers } from "./userSlice"
import { useSelector } from "react-redux"

export const fetchReviews = createAsyncThunk('reviews/fetchReviews',async(productId)=>{
    console.log(productId)
    const response = await axios.get(`http://localhost:7000/api/review/product-review/${productId}`)
    return response.data
})

export const postReview = createAsyncThunk('review/postReviews',async(data)=>{
    const response = await axios.post(`http://localhost:7000/api/review/create-review`,data)
    return response.data
})

const initialState = {
    reviews:[],
    status:'idle',
    error:null
}


const reviewSlice = createSlice({
    name:'review',
    initialState,
    reducers:{
        addReview(state,action){
            console.log(payload)
            // state.push(payload)
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchReviews.pending,(state,action)=>{
                state.status = 'loading'
            })
            .addCase(fetchReviews.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.reviews = action.payload.data
            })
            .addCase(fetchReviews.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(postReview.fulfilled,(state,action)=>{
                const {response,username} = action.payload.data
                
                const review = {...response,user:{username:username}}
                console.log(review)
                
                state.reviews.push(review)
            })
    }
})

export default reviewSlice.reducer
export const selectReview = (state) => state.reviews