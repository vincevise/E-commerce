import { configureStore } from "@reduxjs/toolkit"
import adminSlice from "../features/adminSlice"
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import  userSlice  from "../features/userSlice";
import productSlice from "../features/productSlice";

export const store = configureStore({
    reducer:{
        admin:adminSlice,
        users:userSlice,
        products:productSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})