import { Header } from "./Header";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/redux-store";
import { useEffect, useState } from "react";
import { setAuthData } from "../../redux/auth-reducer";
import axios from "axios";

export type AuthApiProps = {
    resultCode: number;
    messages: string[];
    data: {
        id: number;
        email: string;
        login: string;
    };
};

export const HeaderContainer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { login, isAuth } = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState(true);

    // Проверка авторизации при монтировании
    const checkAuth = async () => {
        setLoading(true);
        try {
            const response = await axios.get<AuthApiProps>(
                "/api/auth/me",
                { withCredentials: true }
            );

            if (response.data.resultCode === 0) {
                const { id, email, login } = response.data.data;
                dispatch(setAuthData({ userId: id.toString(), email, login, isAuth: true }));
            } else {
                dispatch(setAuthData({ userId: null, email: null, login: null, isAuth: false }));
            }
        } catch (err) {
            console.error("Ошибка при auth/me:", err);
            dispatch(setAuthData({ userId: null, email: null, login: null, isAuth: false }));
        } finally {
            setLoading(false);
        }
    };

    // Логин через кнопку (имитация успешного логина)
    const handleLogin = async () => {
        setLoading(true);
        try {
            dispatch(setAuthData({
                userId: "1",
                email: "maly6eva.ksenia@gmail.com",
                login: "ksenia",
                isAuth: true
            }));

            // Можно вызвать checkAuth для синхронизации с сервером, если есть реальные данные
            // await checkAuth();
        } catch (err) {
            console.error("Ошибка при login:", err);
            dispatch(setAuthData({ userId: null, email: null, login: null, isAuth: false }));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return <Header isAuth={isAuth} login={login} loading={loading} onLoginClick={handleLogin} />;
};