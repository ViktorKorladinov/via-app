import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchRegionInfo = createAsyncThunk('counter/fetchCount', async (countryName) => {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then(response => response.json()).then(json => {
            return json
        })
});

const initialState = {
    regions: {
        default: {
            name: "Europe", flag: "", info: []
        }, loading: {
            name: "Loading Region Info", flag: "", info: [],
        },
    }, allRegions: ["default", "loading"], current: "default"
}

export const infoPanelSlice = createSlice({
    name: 'infoPanel', initialState, reducers: {
        reset: (state) => {
            state.current = "default"
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchRegionInfo.pending, (state) => {
                state.current = "loading";
            })
            .addCase(fetchRegionInfo.fulfilled, (state, action) => {
                let country = action.payload[0]
                let countryName = country.name["official"]
                let {population, subregion, flag} = country
                state.current = countryName
                let allRegs = [...state.allRegions, countryName]
                state.regions = {
                    ...state.regions, [countryName]: {
                        name: country, flag, info: [population, subregion]
                    },
                    allRegions: allRegs
                }
            });
    },
});

export const {reset} = infoPanelSlice.actions;

export const selectInfo = (state) => state.infoPanel.regions;
export const selectCurrentRegion = (state) => state.infoPanel.current;

export default infoPanelSlice.reducer;
