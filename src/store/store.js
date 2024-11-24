import { configureStore } from "@reduxjs/toolkit"
import storeSlice from "./slice/store.slice"


export const store = configureStore({
    reducer:{
        fakeStore : storeSlice
    }
})

export default store