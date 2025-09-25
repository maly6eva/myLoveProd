
import avatar from "../../../public/images/avatark.webp";
import s from './Header.module.css';

export const Header = () => {
    return (
        <header className={s.header}>
            <img className={s.headerAvatar} src={avatar} alt=""/>
        </header>
    );
};

