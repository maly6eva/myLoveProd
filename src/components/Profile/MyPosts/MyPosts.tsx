import s from './MyPosts.module.css'
import {Button} from "../../Button/Button.jsx";
import {Post} from "./Post/Post.tsx";
import * as React from "react";
import {type ActionType, type ProfilePagesType} from "../../../redux/state.ts";

type MyPostProps = {
    profilePages:  ProfilePagesType
    dispatch: (action: ActionType) => void
}



export const MyPosts = ({profilePages, dispatch}:  MyPostProps) => {
    const newElement = React.createRef<HTMLTextAreaElement>()

    function postsElements() {
            dispatch({type: 'ADD-POST'})
    }

    const onPostChange = () => {
        if(newElement.current){
            const text = newElement.current.value
            dispatch({type: 'UPDATE-NEW-POST-TEXT', newPost: text})
        }
    }

    return (
        <div className={s.description}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newElement} className={s.textarea} name="" id="" cols={30} rows={10}></textarea>
                </div>
                <div>
                    <Button onClick={postsElements} text='Add post' numb='one'/>
                </div>
               <div className={s.post}>
                   {profilePages.postData.map((p) =>  <Post key={p.id} message={p.message} likeCount={p.likeCount}/>)}
               </div>
            </div>
        </div>
    );
};

