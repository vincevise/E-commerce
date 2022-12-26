import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../features/productSlice'

const ProductTable = ({products}) => {
    const dispatch = useDispatch()
    
    const handleDelete = (id) => {
        dispatch(deleteProduct(id))
        
    }

  return (
    <div> 
        <table className='w-full'>
            <thead>
                <tr className='[&>th]:border [&>th]:px-10 [&>th]:py-3 border-2 text-white bg-slate-600'>
                    <th>Name</th>
                    <th>stock</th>
                    <th>price</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>    
                {products.map((x)=>{
                    return (
                    <tr key={x._id} className='[&>th]:max-h-10 [&>th]:overflow-hidden [&>th]:border [&>th]:px-4 [&>th]:py-2 bg-slate-200'>
                        <th >
                            {x.name.slice(0,20)}
                        </th>
                        
                        <th>
                            {x.stock}
                        </th>
                        <th>
                            Rs. {x.price}
                        </th>
                        <th>
                            <button className='bg-red-400 px-4 py-1 rounded mr-4 text-slate-100' onClick={()=>handleDelete(x._id)}>Delete</button>
                            <button className='bg-green-600 px-4 py-1 rounded text-slate-100'>Edit</button>
                        </th>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default ProductTable

const cellStyle = ''