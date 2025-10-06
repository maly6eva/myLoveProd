import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { authAPILogin } from "../api/auth-api-login.ts";

type AuthState = {
    userId: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
};

const initialState: AuthState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    status: "idle",
    error: null,
};

// LOGIN
export const loginUser = createAsyncThunk<
    { userId: number; email: string; login: string },
    { email: string; password: string },
    { rejectValue: string }
>(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await authAPILogin.login(email, password);
            if (res.data.resultCode === 0) {
                const me = await authAPILogin.me();
                if (me.data.resultCode === 0) {
                    return {
                        userId: me.data.data.id,
                        email: me.data.data.email,
                        login: me.data.data.login,
                    };
                } else {
                    return rejectWithValue(me.data.messages[0] || "Auth failed");
                }
            } else {
                return rejectWithValue(res.data.messages[0] || "Login failed");
            }
        } catch {
            return rejectWithValue("Server error");
        }
    }
);

// CHECK AUTH
export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const me = await authAPILogin.me();
            if (me.data.resultCode === 0) {
                return {
                    userId: me.data.data.id,
                    email: me.data.data.email,
                    login: me.data.data.login,
                };
            } else {
                return rejectWithValue(me.data.messages[0] || "Not authenticated");
            }
        } catch {
            return rejectWithValue("Server error");
        }
    }
);

// LOGOUT
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    await authAPILogin.logout();
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(
                loginUser.fulfilled,
                (state, action: PayloadAction<{ userId: number; email: string; login: string }>) => {
                    state.status = "succeeded";
                    state.userId = action.payload.userId;
                    state.email = action.payload.email;
                    state.login = action.payload.login;
                    state.isAuth = true;
                }
            )
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? "Unknown error";
            })

            // CHECK AUTH
            .addCase(checkAuth.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(
                checkAuth.fulfilled,
                (state, action: PayloadAction<{ userId: number; email: string; login: string }>) => {
                    state.status = "succeeded";
                    state.userId = action.payload.userId;
                    state.email = action.payload.email;
                    state.login = action.payload.login;
                    state.isAuth = true;
                }
            )
            .addCase(checkAuth.rejected, (state, action) => {
                state.status = "failed";
                state.isAuth = false;
                state.error = action.payload as string ?? "Auth check failed";
            })

            // LOGOUT
            .addCase(logoutUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = "succeeded";
                state.userId = null;
                state.email = null;
                state.login = null;
                state.isAuth = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Logout failed";
            });
    },
});

export default authSlice.reducer;