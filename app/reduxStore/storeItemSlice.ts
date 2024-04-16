import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StoreItem } from './models'

interface FetchStoreItemsPayload {
    id: string | string[];
}

export const fetchStoreItems = createAsyncThunk("fetchStoreItems", async (payload: FetchStoreItemsPayload, thunkAPI) => {
    const { id } = payload;
    try {
        const data = await fetch(`http://192.168.1.47:8080/store/item?storeId=${id}`);
        return data.json()
        
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