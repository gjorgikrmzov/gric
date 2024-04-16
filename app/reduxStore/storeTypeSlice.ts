import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StoreType } from './models'

export const fetchStoresTypes = createAsyncThunk("fetchStoreTypes", async () => {
    try {
        const data = await fetch('http://192.168.1.47:8080/store/type')
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