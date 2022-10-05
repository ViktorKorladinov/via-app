import {createAsyncThunk} from "@reduxjs/toolkit";

export const getTheme = createAsyncThunk('appSlice/getTheme', async () => {
    return fetch("http://colormind.io/api/", {
        body: JSON.stringify({"model": "default"}),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    }).then(response => response.json()).then(json => console.log(json))
});