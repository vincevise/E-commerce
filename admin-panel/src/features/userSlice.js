import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie'

const initialState = {
    users:[],
    status:'idle',
    error:null
}


export const fetchUsers = createAsyncThunk('users/fetchUsers',async () => {
    
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:7000/api/auth/getAllUser',{
        headers:{
            cookies:token
        }
    })
    return response.data
})

const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{

    },
    extraReducers(builder){
        builder
            .addCase(fetchUsers.pending,(state,action)=>{
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.users = action.payload.data
            })
            .addCase(fetchUsers.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllUser = (state) => state.users
export default userSlice.reducer