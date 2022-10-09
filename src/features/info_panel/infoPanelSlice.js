import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchRegionInfo = createAsyncThunk('counter/fetchCount', async (countryName, thunkAPI) => {
    if (thunkAPI.getState()["infoPanel"]["fetchedRegions"].includes(countryName)) {
        return {new: false, countryName}
    }
    return fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then(response => response.json()).then(json => {
            return {new: true, countryName, json}
        })
});

const initialState = {
    regions: {
        default: {
            name: "Europe", flag: "", info: []
        }, loading: {
            name: "Loading Region Info", flag: "", info: [],
        },
    }, fetchedRegions: ["default", "loading"], current: "default", allRegions: []
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
                let countryName = action.payload.countryName
                if (action.payload.new) {
                    let country = action.payload.json[0]
                    let countryNameOff = country.name["official"]
                    let {capital, capitalInfo, population, subregion, flag} = country
                    capital = capital[0]
                    let {latlng} = capitalInfo
                    state.regions = {
                        ...state.regions, [countryName]: {
                            name: countryNameOff,
                            flag,
                            info: [population, subregion, {capital, lat: latlng[0], lng: latlng[1]}]
                        }
                    }
                    state.fetchedRegions = [...state["fetchedRegions"], countryName]
                }
                state.current = countryName

            });
    },
});

export const {setAllRegions} = infoPanelSlice.actions;

export const selectInfo = (state) => state.infoPanel.regions;
export const selectCurrentRegion = (state) => state.infoPanel.current;
export const selectAllRegionsLength = (state) => state.infoPanel.allRegions.length;

export default infoPanelSlice.reducer;
