import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Sidebar from "./components/Sidebar"
import { createContext, useState } from "react"
import NavBar1 from "./components/NavBar1"
import Overlay from "./components/Overlay"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserDetails, selectAllUsers } from "./featurs/userSlice"
import UserDetails from "./pages/UserDetails"
import ProductDetails from "./pages/ProductDetails"
import Checkout from "./pages/Checkout"
import Form from "./components/Form"
import LoginForm from "./pages/LoginForm"
import ForgetPassword from "./pages/ForgetPassword"
import ResetPassword from "./pages/ResetPassword"
import './App.css'
 

export const SidebarContext = createContext()

function App() {
  const dispatch = useDispatch()
  const userState = useSelector(selectAllUsers)

  const [sidebar,setSidebar] = useState(false)
  const [form,setForm] = useState(false)
 

  const token = localStorage.getItem('token')
  if(token){ 
    dispatch(fetchUserDetails(token)) 
     
  }


  return (
    <div>
        <BrowserRouter>
        <SidebarContext.Provider value={{sidebar,setSidebar,form,setForm}}>
          <NavBar1/>
          <Sidebar/>
          <Overlay/>
          {form && <Form/>}
          
          <Routes> 
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/products/:id" element={<ProductDetails/>}/>
            <Route path="/user/:user" element={<UserDetails/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/forgot-password" element={<ForgetPassword/>}/>
            <Route path="/resetpassword/:token" element={<ResetPassword/>}/>
          </Routes>
        </SidebarContext.Provider>

        </BrowserRouter>
    </div>
  )
}

export default App
