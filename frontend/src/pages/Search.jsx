import React from 'react'
import {useSelector} from 'react-redux'
import ProductCard from '../components/ProductCard'
import { selectSearch } from '../featurs/searchSlice'

const Search = ( ) => {
   const products = useSelector(selectSearch)
   console.log(products[0])
  return (
    <div className='pt-28 px-10 flex flex-wrap'>
      {products[0]?.map((x)=>{
        return <ProductCard item={x} key={x._id}/>
      })}
    </div>
  )
}

export default Search