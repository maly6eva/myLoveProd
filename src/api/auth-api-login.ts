import axios from "axios";

export const authAPILogin = {
    login(email: string, password: string) {
        return axios.post(
            "/api/auth/login",
            {email, password, rememberMe: true},
            {
                withCredentials: true,
                headers: { "API-KEY": "5ee5c717-0079-4390-a456-8cc718967925" },
            }
        )
    },
    me() {
        return axios.get("/api/auth/me", { withCredentials: true })
    },
    logout() {
        return axios.delete("/api/auth/login", { withCredentials: true })
    }
}