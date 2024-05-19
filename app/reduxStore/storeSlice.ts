import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Store } from './models'

interface fetchStoresByCategoryPayload {
    id: string | null;
    accessToken: string | null
}

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

export const fetchStoresByCategory = createAsyncThunk("fetchStoresByCategory", async (payload: fetchStoresByCategoryPayload) => {
    const { id, accessToken } = payload;
    
    try {
        const data = await fetch(`http://172.20.10.2:8080/store?itemCategoryId=${id}`, {
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
    stores: <Store[]>[],
    storesByCategory: <Store[]>[],
    status: 'idl',
}


const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchStores.pending, (state) => {
            state.status = 'loading';
        })

        builder.addCase(fetchStores.fulfilled, (state, action) => {
            state.stores = action.payload
            state.status = 'succeeded'
        })
        builder.addCase(fetchStoresByCategory.fulfilled, (state, action) => {
            state.storesByCategory = action.payload;
        });
    }



})

export default storeSlice