import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchRegions = createAsyncThunk('regions/fetchAll', async (arr, thunkAPI) => {
    if (thunkAPI.getState()['gamePanel']['loaded']) {
        return { new: false }
    }
    return fetch(`https://restcountries.com/v3.1/subregion/europe`)
        .then(response => response.json()).then(json => {
            let countries = json.filter(region => arr.includes(region['name']['common']) || arr.includes(region['name']['official']))
            return { new: true, countries, json }
        })
})

export const uploadPoints = createAsyncThunk('regions/upload', async (_, thunkAPI) => {
    let points = thunkAPI.getState()['gamePanel']['correctGuesses'] + 100
    return fetch(`https://viktor.jware-virtual.com:8443/api/leaderboard/add`, {
        method: 'POST', credentials: 'include', headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, body: JSON.stringify({ score: points })
    }).then(response => response.json()).catch(err => console.log(err))
})

export const randomizeSelectedRegion = createAsyncThunk('regions/randomize', (_, thunkAPI) => {
    if (thunkAPI.getState()['gamePanel']['loaded']) {
        let countries = thunkAPI.getState()['gamePanel']['countries']
        return { selected: countries[Math.floor((Math.random() * countries.length))] }
    }
    return { selected: null }
})

const initialState = {
    countries: [], loaded: false,
    current: 'France',
    correctGuesses: 0, incorrectGuesses: 0,
    shouldRandomize: false,
    status: 'unplayed',
    uploaded: false,
}

export const gamePanelSlice = createSlice({
    name: 'gamePanel', initialState,
    reducers: {
        evaluateAnswer: (state, action) => {
            if (state.status !== 'playing') return
            let selected = action.payload
            if (selected !== state.current) {
                state.incorrectGuesses += 1
            } else {
                state.correctGuesses += 1
                state.shouldRandomize = true
            }
        },
        prepareGame: (state) => {
            state.correctGuesses = 0
            state.incorrectGuesses = 0
            state.status = 'playing'
            state.uploaded = false
        },
        finishGame: (state) => {
            state.status = 'finished'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegions.fulfilled, (state, action) => {
                if (action.payload.new) {
                    console.log(action.payload.countries.length)
                    state.countries = action.payload.countries
                    state.loaded = true
                }
            })
            .addCase(randomizeSelectedRegion.fulfilled, (state, action) => {
                const { selected } = action.payload
                state.shouldRandomize = false
                state.current = selected['name']['common']
            }).addCase(uploadPoints.fulfilled, (state) => {
            state.uploaded = true
        })
    },
})

export const { evaluateAnswer, prepareGame, finishGame } = gamePanelSlice.actions

export default gamePanelSlice.reducer
