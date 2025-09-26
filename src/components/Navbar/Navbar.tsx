import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div>
                <NavLink to="/profile" className={({isActive}) => isActive ? s.activeLink : s.menu}>Profile</NavLink>
            </div>
            <div>
                <NavLink to="/dialogs" className={({isActive}) => isActive ? s.activeLink : s.menu}>Messages</NavLink>
            </div>
            <div>
                <NavLink to="/users" className={({isActive}) => isActive ? s.activeLink : s.menu}>Users</NavLink>
            </div>
            <div>
                <a href="" className={s.menu}>News</a>
            </div>
            <div>
                <a href="" className={s.menu}>Music</a>
            </div>
            <div>
                <a href="" className={s.menu}>Setting</a>
            </div>
        </nav>
    );
};

