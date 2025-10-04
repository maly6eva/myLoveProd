import { Header } from "./Header";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/redux-store";
import {memo, useEffect} from "react";
import {checkAuth} from "../../redux/auth-slice.ts";



export const HeaderContainer = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const { login, isAuth, status } = useSelector((state: RootState) => state.auth);


    useEffect(() => {
       dispatch(checkAuth());
    }, [dispatch]);

    return <Header
        isAuth={isAuth}
        login={login}
        loading={status === "loading"}/>;
});