import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StoreItem } from './models'

interface FetchStoreItemsPayload {
    id: string | string[];
    accessToken: string
}

export const fetchStoreItems = createAsyncThunk("fetchStoreItems", async (payload: FetchStoreItemsPayload) => {
    const { id, accessToken } = payload;
    try {
        const response = await fetch(`http://172.20.10.2:8080/item?storeId=${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.log(error);
    }
})

const initialState = {
    storeItems: <StoreItem[]>[]
}

const storeItemSlice = createSlice({
    name: 'storeItem',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(fetchStoreItems.fulfilled, (state, action) => {
            state.storeItems = action.payload
        })
    }


})

export default storeItemSlice