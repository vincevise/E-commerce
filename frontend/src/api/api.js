// const baseURL
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:"http://localhost:7000/api"
})

export const createOrder = async(data) => {
    const response = await axiosInstance.post('/orders',data)
    return response.data
}


export const getUserOrders = async(data) => {
    const response = await axiosInstance.get(`/orders/user-orders/${data}`)
    console.log(response)
    return response.data
}

export const getProduct = async(id)=>{
    const response = await axiosInstance.get(`/product/get-product/${id}`)
    return response.data
}