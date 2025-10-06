// import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import { profileAPI } from "../api/profile-api.ts";
//
// export type ProfileProps = {
//     id: number;
//     message: string;
//     likeCount: number;
// };
//
// export type PhotosProps = {
//     small: string | null;
//     large: string | null;
// };
//
// export type ContactsType = {
//     facebook: string | null;
//     website: string | null;
//     vk: string | null;
//     twitter: string | null;
//     instagram: string | null;
//     youtube: string | null;
//     github: string | null;
//     mainLink: string | null;
// };
//
// export type ProfileType = {
//     aboutMe: string;
//     contacts: ContactsType;
//     lookingForAJob: boolean;
//     lookingForAJobDescription: string;
//     fullName: string;
//     userId: number;
//     photos: PhotosProps;
// };
//
// export type ProfilePagesType = {
//     postData: ProfileProps[];
//     newPostText: string;
//     profile: ProfileType | null;
//     status: string;
// };
//
// const initialState: ProfilePagesType = {
//     postData: [],
//     newPostText: "",
//     profile: null,
//     status: ''
// };
//
// // Async thunks
// export const getProfile = createAsyncThunk(
//     "profile/getProfile",
//     async (userId: number) => {
//         const response = await profileAPI.getProfile(userId);
//         return response.data;
//     }
// );
//
// export const getStatus = createAsyncThunk(
//     "profile/getStatus",
//     async (userId: number, { dispatch }) => {
//         const response = await profileAPI.getStatus(userId);
//         dispatch(setStatus(response.data));
//     }
// );
//
// export const updateStatusThunk = createAsyncThunk(
//     "profile/updateStatus",
//     async (status: string, { dispatch }) => {
//         const response = await profileAPI.updateStatus(status);
//         if (response.data.resultCode === 0) {
//             dispatch(setStatus(status));
//         }
//     }
// );
//
// // Slice
// const profileSlice = createSlice({
//     name: "profile",
//     initialState,
//     reducers: {
//         // работа с постами
//         addPost(state, action: PayloadAction<string>) {
//             state.postData.push({
//                 id: state.postData.length + 1,
//                 message: action.payload,
//                 likeCount: 0
//             })
//         },
//         // профиль и статус
//         setUserProfile(state, action: PayloadAction<ProfileType>) {
//             state.profile = action.payload;
//         },
//         setStatus(state, action: PayloadAction<string>) {
//             state.status = action.payload;
//         },
//     }
// });
//
// export const { addPost, setUserProfile, setStatus } = profileSlice.actions;
// export default profileSlice.reducer;

import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { profileAPI } from "../api/profile-api.ts";

export type ProfileProps = {
    id: number;
    message: string;
    likeCount: number;
};

export type PhotosProps = {
    small: string | null;
    large: string | null;
};

export type ContactsType = {
    facebook: string | null;
    website: string | null;
    vk: string | null;
    twitter: string | null;
    instagram: string | null;
    youtube: string | null;
    github: string | null;
    mainLink: string | null;
};

export type ProfileType = {
    aboutMe: string;
    contacts: ContactsType;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    userId: number;
    photos: PhotosProps;
};

export type ProfilePagesType = {
    postData: ProfileProps[];
    newPostText: string;
    profile: ProfileType | null;
    status: string;
    loading: boolean;
    error: string | null;
};

const initialState: ProfilePagesType = {
    postData: [],
    newPostText: "",
    profile: null,
    status: "",
    loading: false,
    error: null
};

// ---------------- Thunks ----------------
export const getProfile = createAsyncThunk(
    "profile/getProfile",
    async (userId: number, { rejectWithValue }) => {
        try {
            const response = await profileAPI.getProfile(userId);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const getStatus = createAsyncThunk(
    "profile/getStatus",
    async (userId: number, { rejectWithValue }) => {
        try {
            const response = await profileAPI.getStatus(userId);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const updateStatusThunk = createAsyncThunk(
    "profile/updateStatus",
    async (status: string, { rejectWithValue }) => {
        try {
            const response = await profileAPI.updateStatus(status);
            if (response.data.resultCode === 0) return status;
            else return rejectWithValue("Не удалось обновить статус");
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

// ---------------- Slice ----------------
const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        addPost(state, action: PayloadAction<string>) {
            state.postData.push({
                id: state.postData.length + 1,
                message: action.payload,
                likeCount: 0
            });
        }
    },
    extraReducers: (builder) => {
        // getProfile
        builder.addCase(getProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getProfile.fulfilled, (state, action: PayloadAction<ProfileType>) => {
            state.profile = action.payload;
            state.loading = false;
        });
        builder.addCase(getProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // getStatus
        builder.addCase(getStatus.fulfilled, (state, action: PayloadAction<string>) => {
            state.status = action.payload;
        });

        // updateStatusThunk
        builder.addCase(updateStatusThunk.fulfilled, (state, action: PayloadAction<string>) => {
            state.status = action.payload;
        });
    }
});

export const { addPost } = profileSlice.actions;
export default profileSlice.reducer;



