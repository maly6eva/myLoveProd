import s from "./Dialogs.module.css";
import { type SubmitHandler, useForm } from "react-hook-form";
import { dialogsAddPost } from "../../redux/dialogs-reducer.ts";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/redux-store.ts";
import { Button } from "../Button/Button.tsx";
import {memo} from "react";

type FormValues = {
    message: string;
};

export const DialogsTextarea = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, reset } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        if (data.message.trim()) {
            dispatch(dialogsAddPost(data.message));
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
                {...register("message")}
                className={s.textarea}
                cols={30}
                rows={10}
            />
            <Button type="submit">Send</Button>
        </form>
    );
});

