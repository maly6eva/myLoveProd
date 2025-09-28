import avatar from "../../images/avatark.webp";
import s from "./Header.module.css";
import {Preloader} from "../common/Preloader.tsx";

type HeaderProps = {
    login: string | null;
    isAuth: boolean;
    loading: boolean;
    onLoginClick: () => void;
};

export const Header = ({ isAuth, login, loading, onLoginClick }: HeaderProps) => {
    return (
        <header className={s.header}>
            <img className={s.headerAvatar} src={avatar} alt="" />
            <div className={s.loginBlock}>
                {loading ? (
                    <span>< Preloader/></span>
                ) : isAuth ? (
                    <span>{login}</span>
                ) : (
                    <button className={s.loginButton} onClick={onLoginClick}>Login</button>
                )}
            </div>
        </header>
    );
};
