import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const authenticate = createAsyncThunk('auth/register', async (userInfo, thunkAPI) => {
    let { credentials, registration } = userInfo
    if (thunkAPI.getState()['auth']['authenticated']) {
        return { authenticated: true }
    }
    let type = registration ? 'register' : 'login'
    return fetch(`http://localhost:8182/auth/${type}`, {
        method: 'POST', credentials: 'include', headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, body: JSON.stringify(credentials)
    }).then(response => {
        let bool = false
        if (response.status === 200) {
            bool = true
            sessionStorage.setItem('status', 'loggedIn')
        }
        return { authenticated: bool }
    })
})

export const checkAuth = createAsyncThunk('auth/check', async (thunkAPI) => {
    let bool = false
    if (sessionStorage.getItem('status') === 'loggedIn') bool = true
    return { authenticated: bool }
})

export const logOut = createAsyncThunk('auth/logOut', async (thunkAPI) => {
    sessionStorage.setItem('status', 'loggedOut')
    document.cookie = ""
    return { authenticated: false }
})

const initialState = {
    authenticated: false, ongoing: false
}

export const authSlice = createSlice({
    name: 'auth', initialState, extraReducers: (builder) => {
        builder
            .addCase(authenticate.pending, (state, action) => {
                state.ongoing = true
            })
            .addCase(authenticate.fulfilled, (state, action) => {
                state.ongoing = false
                state.authenticated = action.payload.authenticated
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.authenticated = action.payload.authenticated
            })
    },
})

export default authSlice.reducer
