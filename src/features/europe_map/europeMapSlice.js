import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    selectedRegion: "Europe",
    loadedRegions: false,
};

export const europeMapSlice = createSlice({
    name: 'europeMap',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        resetSelectedRegion: (state) => {
            state.selectedRegion = initialState.selectedRegion;
        },
        load: (state) => {
            state.loadedRegions = true
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        changeRegion: (state, action) => {
            state.selectedRegion = action.payload;
        },
    }, extraReducers: {}
});

export const {resetSelectedRegion, changeRegion} = europeMapSlice.actions;

export default europeMapSlice.reducer;
