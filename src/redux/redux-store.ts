import {configureStore} from "@reduxjs/toolkit";
import profileReducer from "./profileSlice.ts";
import dialogsReducer from "./dialogsSlice.ts";
import usersReducer from "./usersSlice.ts";
import authReducer from "./authSlice.ts";


export const store = configureStore({
    reducer: {
        profilePages: profileReducer,
        dialogsPages: dialogsReducer,
        usersPages: usersReducer,
        auth: authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;