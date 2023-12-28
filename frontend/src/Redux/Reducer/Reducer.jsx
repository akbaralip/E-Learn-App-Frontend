import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',

    initialState: {
        username: null,
        user_id: null,
        user_image: null,
        role: null,

    },

    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username;


        },
        setUserRole: (state, action) => {
            state.role = action.payload.role;
        },
        setUserImage: (state, action) => {
            state.user_image = action.payload.user_image;
        },
        setUserId: (state, action) => {
            state.user_id = action.payload.user_id
        },
        remove: (state, action) => {
            state.username = null;
            state.user_image = null;
            state.user_id = null;
            state.role = null;
        },
    }



})

export const { setUser, remove, setUserId, setUserImage, setUserRole } = authSlice.actions;

export default authSlice.reducer;