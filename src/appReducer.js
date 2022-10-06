import {createAsyncThunk, createReducer} from "@reduxjs/toolkit";

export const getTheme = createAsyncThunk('appSlice/getTheme', async () => {
    return fetch("http://colormind.io/api/", {
        body: JSON.stringify({"model": "default"}),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    }).then(response => response.json())
});

const initialState = {
    theme: [[255,255,255],[255,255,255],[255,255,255],[255,255,255],[255,255,255]]
}

const appReducer = createReducer(initialState,
    (builder) => {
        builder
            .addCase(getTheme.fulfilled, (state, action) => {
                state.theme = action.payload["result"]
            });
    });

export default appReducer;