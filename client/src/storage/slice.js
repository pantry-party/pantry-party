import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: sessionStorage.getItem('token') === null ? '' : JSON.parse(sessionStorage.getItem('token')),
    user: sessionStorage.getItem('user') === null ? [] : JSON.parse(sessionStorage.getItem('user'))
}

const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        updateToken: (state, { payload }) => {
            state.token = payload
            sessionStorage.setItem('token', JSON.stringify(state.token))
        },
        updateUser: (state, { payload }) => {
            state.user = payload
            sessionStorage.setItem('user', JSON.stringify(state.user))
        }
    }
})

export const { updateToken, updateUser } = slice.actions
export default slice.reducer