import s from './MyPosts.module.css';
import { Post } from "./Post/Post.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/redux-store.ts";
import { MyPostTextarea } from "./MyPostTextarea.tsx";

export const MyPosts = () => {
    const profilePages = useSelector((state: RootState) => state.profilePages);

    return (
        <div className={s.description}>
            <h3>My posts</h3>
            <MyPostTextarea/>
            <div className={s.post}>
                {profilePages.postData.map((p) => (
                    <Post key={p.id} message={p.message} likeCount={p.likeCount}/>
                ))}
            </div>
        </div>
    );
};

