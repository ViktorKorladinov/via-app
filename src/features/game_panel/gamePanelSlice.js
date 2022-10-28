import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchRegions = createAsyncThunk('regions/fetchAll', async (arr, thunkAPI) => {
    if (thunkAPI.getState()["gamePanel"]["loaded"]) {
        return {new: false}
    }
    return fetch(`https://restcountries.com/v3.1/subregion/europe`)
        .then(response => response.json()).then(json => {
            let countries = json.filter(region => arr.includes(region["name"]["common"]) || arr.includes(region["name"]["official"]))
            return {new: true, countries, json}
        })
});

const initialState = {
    countries: [], loaded: false,
}

export const gamePanelSlice = createSlice({
    name: 'gamePanel', initialState, extraReducers: (builder) => {
        builder
            .addCase(fetchRegions.fulfilled, (state, action) => {
                if (action.payload.new) {
                    console.log(action.payload)
                    state.loaded = false;
                }
            });
    },
});

export default gamePanelSlice.reducer;
