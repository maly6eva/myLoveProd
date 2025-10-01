import s from "./MyPosts.module.css";
import { addPost } from "../../../redux/profile-reducer.ts";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { AppDispatch } from "../../../redux/redux-store.ts";
import { useDispatch } from "react-redux";
import { Button } from "../../Button/Button.tsx";

type PostForm = {
    post: string;
};

export const MyPostTextarea = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, reset } = useForm<PostForm>();

    const onSubmit: SubmitHandler<PostForm> = (data) => {
        if (data.post.trim()) {
            dispatch(addPost(data.post)); // добавляем пост
            reset(); // очищаем поле после отправки
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
                {...register("post")}
                className={s.textarea}
                cols={30}
                rows={5}
            />
            <Button type="submit" text="Add post" numb="one" />
        </form>
    );
};
