import {configureStore} from "@reduxjs/toolkit";

import profileReducer from "./profile-reducer.ts";
import dialogsReducer from "./dialogs-reducer.ts";
import usersReducer from "./users-reducer.ts";

export const store = configureStore({
    reducer: {
        profilePages: profileReducer,
        dialogsPages: dialogsReducer,
        usersPages: usersReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;