import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const authenticate = createAsyncThunk('auth/register', async (userInfo, thunkAPI) => {
    let { credentials, registration } = userInfo
    if (thunkAPI.getState()['auth']['authenticated']) {
        return { authenticated: true }
    }
    let type = registration ? 'register' : 'login'
    let response = await fetch(`http://localhost:8182/auth/${type}`, {
        method: 'POST', credentials: 'include', headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, body: JSON.stringify(credentials)
    })
    if (response.status === 200 || response.status === 201) {
        sessionStorage.setItem('status', 'loggedIn')
        return { authenticated: true }
    } else {
        return response.json().then(err => {return { authenticated: false, err }})
    }
})

export const checkAuth = createAsyncThunk('auth/check', async () => {
    let bool = false
    if (sessionStorage.getItem('status') === 'loggedIn') bool = true
    return { authenticated: bool }
})

export const logOut = createAsyncThunk('auth/logOut', async () => {
    sessionStorage.setItem('status', 'loggedOut')
    document.cookie = ''
    return { authenticated: false }
})

const initialState = {
    authenticated: false, ongoing: false, error: null
}

export const authSlice = createSlice({
    name: 'auth', initialState,
    reducers: {
        resetError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticate.pending, (state) => {
                state.ongoing = true
            })
            .addCase(authenticate.fulfilled, (state, action) => {
                state.ongoing = false
                if (action.payload.authenticated)
                    state.authenticated = action.payload.authenticated
                else {
                    state.error = action.payload.err
                }
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.authenticated = action.payload.authenticated
            })
    },
})

export const { resetError } = authSlice.actions

export default authSlice.reducer
