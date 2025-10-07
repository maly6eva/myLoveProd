import s from './MyPosts.module.css';
import {Post} from "./Post/Post.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../../redux/redux-store.ts";
import {MyPostTextarea} from "./MyPostTextarea.tsx";
import {memo} from "react";

export const MyPosts = memo(() => {
    const postData = useSelector((state: RootState) => state.profilePages.postData);

    return (
        <div className={s.description}>
            <h3>My posts</h3>
            <MyPostTextarea/>
            <div className={s.post}>
                {postData.map((p) => (
                    <Post key={p.id} message={p.message} likeCount={p.likeCount}/>
                ))}
            </div>
        </div>
    );
})

