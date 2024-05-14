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
    addresses: <Address[]>[],
    selectedAddressId: ''
}

const addressSlice = createSlice({
    name: 'address',
    initialState: initialState,
    reducers: {
        selectAddress: (state, action) => {
            state.selectedAddressId = action.payload
        }, 
        deleteAddress: (state, action) => {
            const deletedId = action.payload;
            const index = state.addresses.findIndex(address => address.id === deletedId);
            if (index !== -1) {
                state.addresses.splice(index, 1);
                if (state.selectedAddressId === deletedId && state.addresses.length > 0) {
                    state.selectedAddressId = state.addresses[0].id;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAddress.fulfilled, (state, action) => {
            state.addresses = action.payload
            if (state.addresses.length === 1) {
                state.selectedAddressId = state.addresses[0].id;
            }
        })

    }



})

export default addressSlice
export const { selectAddress, deleteAddress } = addressSlice.actions
