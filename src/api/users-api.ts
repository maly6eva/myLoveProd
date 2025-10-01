import axios from "axios";
import {profileAPI} from "./profile-api.ts";

// ---------------- TYPES ----------------
export type PhotosProps = { small: string | null; large: string | null };

export type UsersAPIProps = {
    name: string;
    id: number;
    uniqueUrlName: string | null;
    photos: PhotosProps;
    status: string | null;
    followed: boolean;
};

export type UsersAPIPropsTypes = {
    items: UsersAPIProps[];
    totalCount: number;
    error: string | null;
};

// общий тип ответа от API
export type APIResponseType<D = {}> = {
    resultCode: number;
    messages: string[];
    data: D;
};

// ---------------- INSTANCE ----------------
const instance = axios.create({
    baseURL: "/api/",
    withCredentials: true,
    headers: {
        "API-KEY": "2feffd9f-db7e-42a8-8f7b-bcaec8a11900",
    },
});

// ---------------- API ----------------
export const usersAPI = {
    getUsers(page: number, count: number) {
        return instance.get<UsersAPIPropsTypes>(`users?page=${page}&count=${count}`);
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`);
    },
    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`);
    },
    getProfile(userId: number) {
        console.warn("Obsolete method")
        return profileAPI.getProfile(userId)
    }
};
