import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    selectedRegion: "Europe",
};




export const europeMapSlice = createSlice({
    name: 'europeMap',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        reset: (state) => {
            state.selectedRegion = initialState.selectedRegion;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        changeRegion: (state, action) => {
            state.selectedRegion = action.payload;
        },
    },
});

export const {reset, changeRegion} = europeMapSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectRegion = (state) => state.europeMap.selectedRegion;

export default europeMapSlice.reducer;
