import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Order } from './models'


export const fetchOrder = createAsyncThunk("fetchOrder", async (accessToken: string | null) => {
    try {
        const data = await fetch('http://172.20.10.2:8080/order', {
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
    orders: <Order[]>[]
}

const orderSlice = createSlice({
    name: 'orders',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(fetchOrder.fulfilled, (state, action) => {
            state.orders = action.payload
        })
    }


})

export default orderSlice