import { useState } from "react";
import axios from "axios";

export const Login = () => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);

    const handleLogin = async () => {
        try {
            const response = await axios.get( "`/api/auth/me",
                { withCredentials: true }
            );

            // Если resultCode === 0 — пользователь авторизован
            setIsAuth(response.data.resultCode === 0);
        } catch (err) {
            console.error(err);
            setIsAuth(false); // при ошибке тоже false
        }
    };

    return (
        <div>
            <h2>Login Status</h2>
            <button onClick={handleLogin}>
                {isAuth === null ? "Login" : isAuth ? "true" : "false"}
            </button>
        </div>
    );
};