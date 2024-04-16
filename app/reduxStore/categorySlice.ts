import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Category } from './models'

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
    try {
        const data = await fetch('http://192.168.1.47:8080/category')
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