import loding from "../../images/loding.svg";
import s from "../Users/Users.module.css";

export const Preloader = () => {
    return (
        <div>
            <img src={loding} className={s.loding}/>
        </div>
    )

}