import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartSlice from "../featurs/cartSlice";
import productSlice from "../featurs/productSlice";
import reviewSlice from "../featurs/reviewSlice";
import searchSlice from "../featurs/searchSlice";
import userSlice from "../featurs/userSlice";



export const store = configureStore({
    reducer:{
        user:userSlice,
        products:productSlice,
        cart:cartSlice,
        search:searchSlice,
        reviews:reviewSlice
    },
     middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})