import avatar from "../../images/avatark.webp";
import s from "./Header.module.css";
import {Preloader} from "../common/Preloader.tsx";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../redux/redux-store.ts";
import {logoutUser} from "../../redux/authSlice.ts";
import {Button} from "../Button/Button.tsx";

type HeaderProps = {
    login: string | null;
    isAuth: boolean;
    loading: boolean;
};

export const Header = ({isAuth, login, loading}: HeaderProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await dispatch(logoutUser())
        navigate("/login")
    }
    return (
        <header className={s.header}>
            <img className={s.headerAvatar} src={avatar} alt=""/>
            <div className={s.loginBlock}>
                {loading ? (
                    <span><Preloader/></span>
                ) : isAuth ? (
                    <>
                        <span>{login}</span>
                        <Button onClick={handleLogout} text="Logout"/>
                    </>
                ) : (
                    <>
                        <NavLink to="login">Login</NavLink>
                    </>
                )}
            </div>
        </header>
    );
};
