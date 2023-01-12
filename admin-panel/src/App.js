import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Analytics from "./components/Analytics";
import Products from "./components/Products";
import Sidebar from "./components/Sidebar";
import User from "./components/User";
import { fetchUsers, selectAllUser } from "./features/userSlice";
import Login from "./pages/Login";

 
 

function App() {

  const users = useSelector(selectAllUser)
  const dispatch = useDispatch()
  // fetchUsers
  useEffect(()=>{
    if(users.status === 'idle'){
      dispatch(fetchUsers())
    }
  },[])

  return (
    <div className="flex h-full h-min-screen">
      <BrowserRouter>
      <Sidebar/>
      <Routes >
        <Route path="/" element={<Analytics/>}/>
        <Route path="/users" element={<User/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/products" element={<Products/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
