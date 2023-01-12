import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUserDetails = createAsyncThunk('user/fetchUserDetail',async(token)=>{
    const response = await axios.post('http://localhost:7000/api/auth/getUserDetails',{token})
    return response.data
})


export const loginUser = createAsyncThunk('user/loginUser',async(data)=>{
    const response = await axios.post('http://localhost:7000/api/auth/login',data)
    return response
})


const initialState = {
    username:'',
    email:'',
    token:'',
    error:'',
    authenticated:false
}

const userSlice = createSlice({
    name:'user',
    initialState:{
        username:'',
        email:'',
        token:'',
        error:'',
        authenticated:false
    },
    reducers:{
        logout(state,action){
            state.username = ''
            state.authenticated = false
            state.token = ''
            state.email = ''
        }
    },
    extraReducers(builder){
        builder.addCase(fetchUserDetails.fulfilled,(state,action)=>{
            const {username,email,token,photo} = action.payload.data
            state.username = username
            state.email = email
            state.token = token
            state.photo = photo
            state.authenticated = true
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            const {username,email,token,photo} =  action.payload.data 

            console.log(action.payload)
            state.email = email
            state.token = token
            state.username = username
            state.authenticated = true
            state.photo = photo
            localStorage.setItem('token',token)
            state.error = ''
        })
        .addCase(loginUser.rejected,(state,action)=>{
            console.log(action.payload)
            state.error = 'invalid Credentails'
        })
    }
})


export const selectAllUsers = (state) =>state.user

export const {logout} = userSlice.actions

export default userSlice.reducer