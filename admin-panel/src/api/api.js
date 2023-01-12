import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:"http://localhost:7000/api"
})

export const getAllOrders = async()=>{
    const response = await axiosInstance.get('/orders')
    return response.data
}

// http://localhost:7000/api/product/get-product/639b0da1ead4da56a3282538

