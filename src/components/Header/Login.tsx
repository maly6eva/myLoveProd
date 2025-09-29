import { useDispatch } from "react-redux";
import { useState } from "react";
import { setAuthData } from "../../redux/auth-reducer";
import { authAPILogin } from "../../api/auth-api-login.ts"


export const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("maly6eva.ksenia@gmail.com");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await authAPILogin.login(email, password);
            if (res.data.resultCode === 0) {
                const me = await authAPILogin.me();
                dispatch(
                    setAuthData({
                        userId: me.data.data.id,
                        email: me.data.data.email,
                        login: me.data.data.login,
                        isAuth: true,
                    })
                );
            }
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input value={email} onChange={e => setEmail(e.target.value)} />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};