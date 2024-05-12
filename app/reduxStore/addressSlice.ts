import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Address, Store } from './models'

interface FetchStoreItemsPayload {
    personId: string | null;
    accessToken: string | null
}


export const fetchAddress = createAsyncThunk("fetchAddress", async (payload: FetchStoreItemsPayload) => {
    const { personId, accessToken } = payload;

    try {
        const data = await fetch(`http://172.20.10.2:8080/address?personId=${personId}`, {
            method: "GET",
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
    addresses: <Address[]>[]
}

const addressSlice = createSlice({
    name: 'address',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAddress.fulfilled, (state, action) => {
            state.addresses = action.payload
        })
    }



})

export default addressSlice