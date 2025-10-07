import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {profileAPI} from "../api/profile-api.ts";

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
    async (userId: number, {rejectWithValue}) => {
        try {
            const response = await profileAPI.getProfile(userId);
            return response.data;
        } catch (err: unknown) {
            if (err instanceof Error) return rejectWithValue(err.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const getStatus = createAsyncThunk(
    "profile/getStatus",
    async (userId: number, {rejectWithValue}) => {
        try {
            const response = await profileAPI.getStatus(userId);
            return response.data;
        } catch (err: unknown) {
            if (err instanceof Error) return rejectWithValue(err.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const updateStatusThunk = createAsyncThunk(
    "profile/updateStatus",
    async (status: string, {rejectWithValue}) => {
        try {
            const response = await profileAPI.updateStatus(status);
            if (response.data.resultCode === 0) return status;
            else return rejectWithValue("Не удалось обновить статус");
        } catch (err: unknown) {
            if (err instanceof Error) return rejectWithValue(err.message);
            return rejectWithValue("Unknown error");
        }
    }
);

export const updateProfileThunk = createAsyncThunk(
    "profile/updateProfile",
    async (updatedProfile: ProfileType, {rejectWithValue}) => {
        try {
            const response = await profileAPI.saveProfile(updatedProfile);
            if (response.data.resultCode === 0) {
                return updatedProfile
            } else {
                return rejectWithValue(response.data.messages[0])
            }
        } catch (err: unknown) {
            if (err instanceof Error) return rejectWithValue(err.message)
            return rejectWithValue("Unknown error");
        }
    }
)

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

        builder.addCase(updateProfileThunk.fulfilled, (state, action) => {
            state.profile = action.payload
        })
    }
});

export const {addPost} = profileSlice.actions;
export default profileSlice.reducer;



