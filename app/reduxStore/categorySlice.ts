import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Category } from './models'

export const fetchCategories = createAsyncThunk("fetchCategories", async (accessToken: string | null) => {
    try {
        const data = await fetch('http://172.20.10.2:8080/category', {
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
    categories: <Category[]>[]
}

const categorySlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        })
    }


})

export default categorySlice