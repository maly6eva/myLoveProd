import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthProps = {
    userId: string | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
}

const initialState: AuthProps = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthData(state, action: PayloadAction<AuthProps>) {
            state.userId = action.payload.userId;
            state.email = action.payload.email;
            state.login = action.payload.login;
            state.isAuth = action.payload.isAuth; // исправлено
        },
        logout(state) {
            state.userId = null;
            state.email = null;
            state.login = null;
            state.isAuth = false;
        }
    }
})

export const { setAuthData,logout} = authSlice.actions;
export default authSlice.reducer;
