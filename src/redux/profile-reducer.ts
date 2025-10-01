


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
};

const initialState: ProfilePagesType = {
    postData: [],
    newPostText: "",
    profile: null,
    status: ''
};

// Async thunks
export const getProfile = createAsyncThunk(
    "profile/getProfile",
    async (userId: number, { dispatch }) => {
        const response = await profileAPI.getProfile(userId);
        dispatch(setUserProfile(response.data));
    }
);

export const getStatus = createAsyncThunk(
    "profile/getStatus",
    async (userId: number, { dispatch }) => {
        const response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
    }
);

export const updateStatusThunk = createAsyncThunk(
    "profile/updateStatus",
    async (status: string, { dispatch }) => {
        const response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
);

// Slice
const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        // работа с постами
        addPost(state) {
            state.postData.push({
                id: state.postData.length + 1,
                message: state.newPostText,
                likeCount: 0
            })
            state.newPostText = '';
        },
        updateNewPostText(state, action: PayloadAction<string>) {
            state.newPostText = action.payload;
        },
        // профиль и статус
        setUserProfile(state, action: PayloadAction<ProfileType>) {
            state.profile = action.payload;
        },
        setStatus(state, action: PayloadAction<string>) {
            state.status = action.payload;
        }
    }
});

export const { addPost, updateNewPostText, setUserProfile, setStatus } = profileSlice.actions;
export default profileSlice.reducer;





