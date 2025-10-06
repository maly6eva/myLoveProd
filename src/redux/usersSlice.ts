import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {usersAPI, type UsersAPIPropsTypes} from "../api/users-api.ts";
import aVa from "../images/aVa.webp";

export type LocationProps = {
    city: string;
    country: string;
};

export type UsersProps = {
    id: number;
    followed: boolean;
    photo: string;
    fullName: string;
    status: string;
    location: LocationProps;
};

export type UsersPropsType = {
    usersData: UsersProps[];
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    isFetching: boolean;
    followingInProgress: number[];
};

const initialState: UsersPropsType = {
    usersData: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
};

// ----------------- THUNKS -----------------

export const fetchUsers = createAsyncThunk<
    UsersAPIPropsTypes,
    { page: number; pageSize: number },
    { rejectValue: string }
>("users/fetchUsers", async ({page, pageSize}, thunkAPI) => {
    try {
        const response = await usersAPI.getUsers(page, pageSize);
        return response.data;
    } catch (err) {
        console.error("fetchUsers error:", err);
        return thunkAPI.rejectWithValue("Не удалось загрузить пользователей");
    }
});

export const followUser = createAsyncThunk<
    number, // возвращаем только userId
    number,
    { rejectValue: string }
>("users/followUser", async (userId, {rejectWithValue}) => {
    try {
        const res = await usersAPI.follow(userId);
        if (res.data.resultCode === 0) {
            return userId; // ✅ успех → пойдёт в fulfilled
        } else {
            return rejectWithValue(res.data.messages[0] || "Не удалось подписаться");
        }
    } catch (err) {
        console.error("followUser error:", err);
        return rejectWithValue("Ошибка сервера при подписке");
    }
});

export const unfollowUser = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>("users/unfollowUser", async (userId, {rejectWithValue}) => {
    try {
        const res = await usersAPI.unfollow(userId);
        if (res.data.resultCode === 0) {
            return userId; // ✅ успех
        } else {
            return rejectWithValue(res.data.messages[0] || "Не удалось отписаться");
        }
    } catch (err) {
        console.error("unfollowUser error:", err);
        return rejectWithValue("Ошибка сервера при отписке");
    }
});

// ----------------- SLICE -----------------

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        // ---- fetchUsers ----
        builder.addCase(fetchUsers.pending, (state) => {
            state.isFetching = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isFetching = false;
            state.usersData = action.payload.items.map((u) => ({
                id: u.id,
                followed: u.followed,
                fullName: u.name,
                status: u.status || "No status",
                photo: u.photos.small || aVa,
                location: {country: "Belarus", city: "Minsk"},
            }));
            state.totalUsersCount = action.payload.totalCount;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isFetching = false;
            if (action.payload) {
                console.error("fetchUsers rejected:", action.payload);
            } else {
                console.error("fetchUsers rejected:", action.error.message);
            }
        });

        // ---- followUser ----
        builder.addCase(followUser.pending, (state, action) => {

            state.followingInProgress.push(action.meta.arg);
        });
        builder.addCase(followUser.fulfilled, (state, action) => {
            state.usersData = state.usersData.map((u) =>
                u.id === action.payload ? {...u, followed: true} : u
            );
            state.followingInProgress = state.followingInProgress.filter(
                (id) => id !== action.payload
            );
        });
        builder.addCase(followUser.rejected, (state, action) => {
            state.followingInProgress = state.followingInProgress.filter(
                (i) => i !== action.meta.arg
            );
            console.warn("Follow rejected:", action.payload);

        });

        // ---- unfollowUser ----
        builder.addCase(unfollowUser.pending, (state, action) => {
            state.followingInProgress.push(action.meta.arg);
        });
        builder.addCase(unfollowUser.fulfilled, (state, action) => {
            state.usersData = state.usersData.map((u) =>
                u.id === action.payload ? {...u, followed: false} : u
            );
            state.followingInProgress = state.followingInProgress.filter(
                (id) => id !== action.payload
            );
        });
        builder.addCase(unfollowUser.rejected, (state, action) => {
            state.followingInProgress = state.followingInProgress.filter(
                (i) => i !== action.meta.arg
            );
            console.warn("Unfollow rejected:", action.payload);
        });
    },
});

export const {setCurrentPage} = usersSlice.actions;
export default usersSlice.reducer;


