 import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name:'search',
    initialState:[],
    reducers:{
        removeSearch(state,action){
            state.length = 0
        },
        addSearch(state,action){
            state.length = 0
            state.push(action.payload)
        }
    }
})

export default searchSlice.reducer
export const selectSearch = (state) =>state.search
export const {addSearch,removeSearch} = searchSlice.actions