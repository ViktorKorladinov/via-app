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

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectRegion = (state) => state.europeMap.selectedRegion;

export default europeMapSlice.reducer;
