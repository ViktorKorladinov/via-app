import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchRegionInfo = createAsyncThunk('counter/fetchCount', async (countryName) => {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then(response => response.json()).then(json => {
            return json
        })
});

const initialState = {
    info: []
}

export const infoPanelSlice = createSlice({
    name: 'infoPanel', initialState, reducers: {
        reset: (state) => {
            state.info = initialState.info;
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchRegionInfo.pending, (state) => {
                state.info = [`Fetching data...`];
            })
            .addCase(fetchRegionInfo.fulfilled, (state, action) => {
                let country = action.payload[0]
                let {population, subregion, flag} = country
                state.info = [population, subregion, flag];
            });
    },
});

export const {reset} = infoPanelSlice.actions;

export const selectInfo = (state) => state.infoPanel.info;

export default infoPanelSlice.reducer;
