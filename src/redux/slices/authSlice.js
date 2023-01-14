import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: null,
    password: null,
    signature: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            console.log({ payload: action.payload })
            const { email, password, signature } = action.payload
            if (email) {
                state.email = email;
            }
            if (password) {
                state.password = password;
            }
            if (signature) {
                state.signature = signature;
            }            

        },
        resetAuth: (state) => {
            state.user = initialState
        }
    },
})


export const { setAuth, resetAuth } = authSlice.actions

export default authSlice.reducer