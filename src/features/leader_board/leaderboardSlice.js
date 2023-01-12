import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    scores: []
}

export const fetchLeaderboard = createAsyncThunk('leaderboard/fetch', async (_) => {
    return fetch(`https://viktor.jware-virtual.com:8443/api/leaderboard/top/10`, { credentials: 'include' })
        .then(response => response.json()).then(json => {
            return json
        }).catch(() => ({message: 'Server unavailable'}))
})

export const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeaderboard.fulfilled, (state, action) => {
                if (action.payload.scores) {
                    state.scores = action.payload.scores
                }
            })
    }
})

export default leaderboardSlice.reducer
