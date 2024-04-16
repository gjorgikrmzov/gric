import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Store } from './models'

export const fetchStores = createAsyncThunk("fetchStores", async () => {
    try {
        const data = await fetch('http://192.168.1.47:8080/store')
        return data.json()
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    stores: <Store[]>[]
}

const storeSlice = createSlice({
    name: 'store',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
       builder.addCase(fetchStores.fulfilled, (state, action) => {
            state.stores = action.payload
        })
    }
        


})

export default storeSlice