import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartSlice from "../featurs/cartSlice";
import productSlice from "../featurs/productSlice";
import userSlice from "../featurs/userSlice";



export const store = configureStore({
    reducer:{
        user:userSlice,
        products:productSlice,
        cart:cartSlice
    },
     middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})