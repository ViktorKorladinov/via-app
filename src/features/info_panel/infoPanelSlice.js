import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchRegionInfo = createAsyncThunk('counter/fetchCount', async (countryName) => {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then(response => response.json()).then(json => {
            console.log(json)
            return "A"
        })
});

const initialState = {
    info: "Default Info"
}

export const infoPanelSlice = createSlice({
    name: 'infoPanel', initialState, reducers: {
        reset: (state) => {
            state.info = initialState.info;
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchRegionInfo.pending, (state) => {
                state.info = 'loading';
            })
            .addCase(fetchRegionInfo.fulfilled, (state, action) => {
                console.log(action.payload);
            });
    },
});

export const {reset} = infoPanelSlice.actions;

export const selectInfo = (state) => state.infoPanel.info;

export default infoPanelSlice.reducer;
