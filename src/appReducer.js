import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'

export const getTheme = createAsyncThunk('appSlice/getTheme', async () => {
    const mutedColor = rand(75, 170).toString(16)
        +rand(75, 170).toString(16)
        +rand(75, 170).toString(16);

    function rand(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    console.log(`https://www.thecolorapi.com/scheme?hex=${mutedColor}&mode=analogic-complement&count=4`)

    return fetch(`https://www.thecolorapi.com/scheme?hex=${mutedColor}&mode=monochrome-light&count=4`)
        .then(res => res.json())
        .then(json => json.colors.map(c => {
                const { r, g, b } = c.rgb
                return [r, g, b]
            })
        )
})

const initialState = {
    theme: [[255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255]]
}

const appReducer = createReducer(initialState,
    (builder) => {
        builder
            .addCase(getTheme.fulfilled, (state, action) => {
                state.theme = action.payload
            })
    })

export default appReducer