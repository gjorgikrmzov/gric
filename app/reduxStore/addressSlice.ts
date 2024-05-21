import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Address, Store } from './models'

interface FetchAddressPaylaod {
    personId: string | null;
    accessToken: string | null
}

export const fetchAddress = createAsyncThunk("fetchAddress", async (payload: FetchAddressPaylaod) => {
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
}

const addressSlice = createSlice({
    name: 'address',
    initialState: initialState,
    reducers: {
        deleteAddress: (state, action) => {
            const deletedId = action.payload;
            const index = state.addresses.findIndex(address => address.id === deletedId);
            if (index !== -1) {
                state.addresses.splice(index, 1);   
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAddress.fulfilled, (state, action) => {
            state.addresses = action.payload
        })

    }



})

export default addressSlice
export const { deleteAddress } = addressSlice.actions
