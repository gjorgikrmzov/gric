import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { User } from './models'


export const fetchUserInfo = createAsyncThunk("fetchUserInfo", async (accessToken: string | null) => {
    try {
        const data = await fetch('http://172.20.10.2:8080/person', {
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

const initialState: User = {
    id: "",
    email: "",
    mobileNumber: "",
    firstName: "",
    lastName: "",
    role: "",
    addresses: []
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.id = action.payload.id
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.email = action.payload.email
            state.mobileNumber = action.payload.mobileNumber
            state.role = action.payload.role
            state.addresses = action.payload.addresses
        })
    }


})

export default userSlice