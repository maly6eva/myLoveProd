import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../redux/redux-store.ts";

// HOC принимает компонент и возвращает компонент
export function withAuthRedirect<T extends object>(
    Component: React.ComponentType<T>
) {
    const RedirectComponent: React.FC<T> = (props) => {
        const isAuth = useSelector((state: RootState) => state.auth.isAuth);

        if (!isAuth) {
            return <Navigate to="/login" replace />;
        }

        // теперь TS понимает, что props совместимы
        return <Component {...(props as T)} />;
    };

    return RedirectComponent;
}