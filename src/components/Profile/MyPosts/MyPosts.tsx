import s from './MyPosts.module.css'
import {Button} from "../../Button/Button.jsx";
import {Post} from "./Post/Post.tsx";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../redux/redux-store.ts";
import type {AppDispatch} from "../../../redux/redux-store.ts";
import {addPost, updateNewPostText} from "../../../redux/profile-reducer.ts";


export const MyPosts = () => {
    const dispatch = useDispatch<AppDispatch>()
    const profilePages = useSelector((state: RootState) => state.profilePages)
    const onAddPost = () => dispatch(addPost())
    const newElement = React.createRef<HTMLTextAreaElement>()

    // const postsElements = () => {
    //     dispatch(addPost())
    // }


    const onPostChange = () => {
        if (newElement.current) {
            dispatch(updateNewPostText(newElement.current.value))
        }
    }

    return (
        <div className={s.description}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        value={profilePages.newPostText}
                        onChange={onPostChange}
                        ref={newElement}
                        className={s.textarea} name="" id="" cols={30}
                        rows={10}></textarea>
                </div>
                <div>
                    <Button onClick={onAddPost} text='Add post' numb='one'/>
                </div>
                <div className={s.post}>
                    {profilePages.postData.map((p) => <Post key={p.id} message={p.message} likeCount={p.likeCount}/>)}
                </div>
            </div>
        </div>
    );
};

