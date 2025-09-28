import {useSelector} from "react-redux";
import type { RootState} from "../../redux/redux-store.ts";

export const LoginButton = () => {
    const {login, isAuth} = useSelector((state: RootState) => state.auth)

    return (
        <button>
            {isAuth ? login : "Login"}
        </button>
    )
}