import s from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";

type DialogsItemProps = {
    id: number;
    name: string;
}

export const DialogsItem = ({id, name}: DialogsItemProps) => {
    const path = "/dialogs/" + id;

    return (
        <div className={s.dialog}>
            <NavLink
                to={path}
                className={({isActive}) => `${s.dialog}  ${isActive ? s.active : ''}`}
            >{name}
            </NavLink>
        </div>

    )
}