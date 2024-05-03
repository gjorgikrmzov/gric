import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Store } from './models'

export const fetchStores = createAsyncThunk("fetchStores", async (accessToken: string | null) => {
    try {
        const data = await fetch('http://172.20.10.2:8080/store', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })
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