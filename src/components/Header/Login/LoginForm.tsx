import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../redux/redux-store.ts";
import {useForm} from "react-hook-form";
import {loginUser} from "../../../redux/authSlice.ts";
import {memo, useEffect} from "react";
import {useNavigate} from "react-router-dom";

type LoginFormInputs = {
    email: string;
    password: string;
    rememberMe: boolean;
}

export const LoginForm = memo(() => {
    const dispatch = useDispatch<AppDispatch>()
    const {status, error, isAuth} = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginFormInputs>({
        defaultValues: {
            email: "maly6eva.ksenia@gmail.com",
            password: "",
            rememberMe: false
        }
    })

    const onSubmit = (data: LoginFormInputs) => {
        dispatch(loginUser({email: data.email, password: data.password}))
    }

    useEffect(() => {
        if (isAuth) {
            navigate("/profile")
        }
    }, [isAuth, navigate])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    {...register("email", {required: "Email is required"})}
                    placeholder="Email"
                />
                {errors.email && (
                    <p style={{color: "red"}}>{errors.email.message}</p>
                )}
            </div>

            <div>
                <input style={{border: "red"}}
                       type="password"
                       {...register("password", {required: "Password is required"})}
                       placeholder="Password"/>
                {errors.password && (
                    <p style={{color: "red"}}>{errors.password.message}</p>
                )}
            </div>

            <div>
                <input
                    type="checkbox"
                    {...register("rememberMe")}
                /> remember me
            </div>

            <div>
                <button type="submit" disabled={status === "loading"}>
                    {status === "loading" ? "Logging in..." : "Login"}
                </button>
                {error && <p style={{color: "red"}}>{error}</p>}
            </div>
        </form>
    );
});
