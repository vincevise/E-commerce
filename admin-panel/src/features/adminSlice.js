import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


 

export const loginAdmin = createAsyncThunk('admin/loginAdmin',async(data)=>{
    const response = await axios.post('http://localhost:7000/api/auth/login-admin',data)
    return response
})

const adminSlice = createSlice({
    name:'admin',
    initialState:{
        username:'',
        token:'',
        error:''
    },
    reducers:{

    },
    extraReducers(builder){
        builder.addCase(loginAdmin.fulfilled,(state,action)=>{
            const {username,token} = action.payload.data
            localStorage.setItem('token',token)
            state.username = username
            state.token = token
            state.authenticated = true
            state.error = ''
            
        })
        .addCase(loginAdmin.rejected,(state,action)=>{
            state.error = action.payload.data
        })
        
    }
})

export const selectAdmin = (state) =>state.admin
export default adminSlice.reducer