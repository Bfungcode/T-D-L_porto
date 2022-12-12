import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todoAPI from "./todoAPI";

export const getTodos = createAsyncThunk("todos",
    async (pagi, thunkAPI) => {
        try {
            const response = await todoAPI.getTodos(pagi);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue();
        }
    }
)
const initialState = {
    list: null,
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    extraReducers: {
        [getTodos.fulfilled]: (state, action) => {
            state.list = action.payload
        },
        [getTodos.rejected]: (state, action) => {
            state.list = null;
        }
    }
})
const { reducer } = todoSlice;
export default reducer;