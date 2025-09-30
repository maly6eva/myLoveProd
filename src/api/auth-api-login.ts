import axios from "axios";

type LoginResponse = {
    resultCode: number;
    messages: string[];
    data: { userId: number };
};

type MeResponse = {
    data: { id: number; email: string; login: string };
};

export const authAPILogin = {
    login(email: string, password: string) {
        return axios.post<LoginResponse>(
            "/api/auth/login",
            { email, password, rememberMe: true },
            {
                withCredentials: true,
                headers: { "API-KEY": "2feffd9f-db7e-42a8-8f7b-bcaec8a11900" },
            }
        );
    },
    me() {
        return axios.get<MeResponse>("/api/auth/me", { withCredentials: true });
    },
    logout() {
        return axios.delete("/api/auth/login", { withCredentials: true });
    },
};