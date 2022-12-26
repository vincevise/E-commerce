import { BrowserRouter, Route, Routes } from "react-router-dom";
import Analytics from "./components/Analytics";
import Products from "./components/Products";
import Sidebar from "./components/Sidebar";
import User from "./components/User";
import Login from "./pages/Login";

 
 

function App() {
  return (
    <div className="flex">
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
