import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/redux-store";
import { loginUser } from "../../redux/auth-slice";
import { useState } from "react";

export const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState("maly6eva.ksenia@gmail.com");
    const [password, setPassword] = useState("");
    const { status, error } = useSelector((state: RootState) => state.auth);

    const handleLogin = () => {
        dispatch(loginUser({ email, password }));
    };

    return (
        <div>
            <h2>Login</h2>
            <input value={email}
                   onChange={e => setEmail(e.target.value)}
                   placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}
                    disabled={status === "loading"}>
                {status === "loading" ? "Logging in..." : "Login"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};