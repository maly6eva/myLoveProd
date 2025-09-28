import avatar from "../../images/avatark.webp";
import s from "./Header.module.css";
import {Preloader} from "../common/Preloader.tsx";
import {NavLink} from "react-router-dom";

type HeaderProps = {
    login: string | null;
    isAuth: boolean;
    loading: boolean;
};

export const Header = ({isAuth, login, loading}: HeaderProps) => {
    return (
        <header className={s.header}>
            <img className={s.headerAvatar} src={avatar} alt=""/>
            <div className={s.loginBlock}>
                {loading ? (
                    <span>< Preloader/></span>
                ) : isAuth ? (
                    <span>{login}</span>
                ) : (
                    <>
                        <NavLink to="login">Login</NavLink>
                    </>
                )}
            </div>
        </header>
    );
};
