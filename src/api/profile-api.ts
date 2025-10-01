import type {APIResponseType} from "./users-api.ts";
import axios from "axios";

const instance = axios.create({
    baseURL: "/api/",
    withCredentials: true,
    headers: {
        "API-KEY": "2feffd9f-db7e-42a8-8f7b-bcaec8a11900",
    },
});

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status});
    },

}