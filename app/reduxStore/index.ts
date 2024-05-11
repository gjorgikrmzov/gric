import { configureStore } from '@reduxjs/toolkit'
import storeSlice from './storeSlice'
import storeTypeSlice from './storeTypeSlice'
import categorySlice from './categorySlice'
import storeItemSlice from './storeItemSlice'
import cartSlice from './cartSlice'
import accessTokenSlice from './accessTokenSlice'
import userSlice from './userSlice'

export const store = configureStore({
    reducer: {
        store: storeSlice.reducer,
        storeType: storeTypeSlice.reducer,
        category: categorySlice.reducer,
        storeItem: storeItemSlice.reducer,
        cart: cartSlice.reducer,
        accessToken: accessTokenSlice.reducer,
        user: userSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
