import React from 'react'
import { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import axios from "axios"
import { useState } from 'react';
import ProductCard from '../components/ProductCard';

const CategoryProducts = () => {
    const {category} = useParams()
    const [products,setProducts] = useState([]) 
    

    const fetchCategoryProduct = async() => {
        await axios.get(`http://localhost:7000/api/category/${category}`).then((res)=>setProducts(res.data.data.products))
    }

    useEffect(()=>{
        fetchCategoryProduct()
        console.log(category)
    },[category])

  return (
    <div className='pt-28 px-10 flex flex-wrap pb-36'>
        {products?.map((x)=>{
            return <ProductCard item={x} key={x._id}/>
        })}
    </div>
  )
}

export default CategoryProducts