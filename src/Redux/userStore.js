import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    token: null,
    id: null,
};

export const userLoginSlice = createSlice({
    name: "userLogin",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        setLogout: (state) => {
            state.name = null;
            state.email = null;
            state.token = null;
            state.id = null;
        },
    },
});

export const { setLogin, setLogout } = userLoginSlice.actions;

export default userLoginSlice.reducer;
