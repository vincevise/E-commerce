import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Sidebar from "./components/Sidebar"
import { createContext, useState } from "react"
import NavBar from "./components/NavBar"
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
import CategoryProducts from "./pages/CategoryProducts"
import Footer from "./components/Footer"
import Payment from "./pages/Payment"
import axios from "axios"
import { useEffect } from "react"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./pages/Success"
 

export const SidebarContext = createContext()

function App() {
  let api_key = ''
  const dispatch = useDispatch()
  const [data,setData] = useState([])
  const [sidebar,setSidebar] = useState(false)
  const [form,setForm] = useState(false)
  
  const [stripeApiKey,setStripeApiKey] = useState()
  const getStripeApiKey = async() => {
    let {data} = await axios.get('http://localhost:7000/api/payment/stripeapikey')
    setStripeApiKey(data.stripeApiKey)
    api_key = data
  }

  const token = localStorage.getItem('token')
  if(token){ 
    dispatch(fetchUserDetails(token)) 
    
  }

  useEffect(()=>{
    getStripeApiKey() 
  },[])


  return (
    <div className="relative ">
      
        <BrowserRouter>
        <SidebarContext.Provider value={{sidebar,setSidebar,form,setForm}}>
          <NavBar/>
          <Sidebar/>
          <Overlay/>
          {form && <Form/>}
          
          <Routes> 
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/search/:key" element={<Search/>}/>
            <Route path="/products/:id" element={<ProductDetails/>}/>
            <Route path="/category/:category" element={<CategoryProducts/>}/>
            <Route path="/success" element={<Success/>}/>
            <Route path="/user/:user" element={<UserDetails/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/forgot-password" element={<ForgetPassword/>}/>
            <Route path="/resetpassword/:token" element={<ResetPassword/>}/>
          
            {stripeApiKey && <Route path="/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>}/>}
          
          </Routes>
        {/* <Footer/> */}

        </SidebarContext.Provider>
        </BrowserRouter>

    </div>
  )
}

export default App
