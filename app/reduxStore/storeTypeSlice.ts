import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StoreType } from './models'

export const fetchStoresTypes = createAsyncThunk("fetchStoreTypes", async (accessToken: string | null) => {
    try {
        const data = await fetch('http://172.20.10.2:8080/store/type', {
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
    storeTypes: <StoreType[]>[]
}

const storeTypeSlice = createSlice({
    name: 'storeType',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {

        builder.addCase(fetchStoresTypes.fulfilled, (state, action) => {
            state.storeTypes = action.payload
        })
    }


})

export default storeTypeSlice