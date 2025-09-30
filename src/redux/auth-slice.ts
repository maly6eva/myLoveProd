import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {authAPILogin} from "../api/auth-api-login.ts";


type AuthState = {
    userId: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: AuthState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    status: "idle",
    error: null,
}

export const loginUser = createAsyncThunk<
    { userId: number, email: string; login: string },
    { email: string, password: string },
    { rejectValue: string }

>("auth/loginUser",
    async ({email, password}, {rejectWithValue}) => {
        try {
            const res = await authAPILogin.login(email, password);
            if (res.data.resultCode === 0) {
                const me = await authAPILogin.me()
                return {
                    userId: me.data.data.id,
                    email: me.data.data.email,
                    login: me.data.data.login,
                };
            } else {
                return rejectWithValue(res.data.messages[0] || "Login failed")
            }
        } catch {
            return rejectWithValue("Server error",)
        }
    }
)

export const checkAuth = createAsyncThunk("auth/checkAuth",
    async () => {
        const me = await authAPILogin.me()
        return {
            userId: me.data.data.id,
            email: me.data.data.email,
            login: me.data.data.login,
        }
    })

export const logoutUser = createAsyncThunk("auth/logoutUser",
    async () => {
        await authAPILogin.logout();
    })

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null
            })
            .addCase(
                loginUser.fulfilled,
                (state, action: PayloadAction<{ userId: number; email: string; login: string }>) => {
                    state.status = "succeeded"
                    state.userId = action.payload.userId;
                    state.email = action.payload.email;
                    state.login = action.payload.login;
                    state.isAuth = true;
                })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? "Unknown error";
            })
            .addCase(
                checkAuth.fulfilled,
                (state, action: PayloadAction<{ userId: number; email: string; login: string }>) => {
                    state.isAuth = true;
                    state.userId = action.payload.userId;
                    state.email = action.payload.email;
                    state.login = action.payload.login;
                })
            .addCase(logoutUser.fulfilled, (state) => {
                state.userId = null;
                state.email = null;
                state.login = null;
                state.isAuth = false;
                state.status = "idle";
                state.error = null;
            })
    }
})

export default authSlice.reducer;