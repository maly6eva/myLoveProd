import s from './Dialogs.module.css';
import {DialogsItem} from "./DialogsItem/DialogsItem.tsx";
import {Massage} from "./Message/Message.tsx";
import {Button} from "../Button/Button.tsx";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import type { RootState } from "../../redux/redux-store.ts";
import {dialogsAddPost, updateNewPostDialogText} from "../../redux/dialogs-reducer.ts";
import type {AppDispatch} from "../../redux/redux-store.ts";




export const Dialogs = () => {
    const dispatch = useDispatch<AppDispatch>()
    const dialogsPages = useSelector((state: RootState) => state.dialogsPages)

    const newPost = React.createRef<HTMLTextAreaElement>();

    function dialogsPost() {
        dispatch( dialogsAddPost())
    }

    const onDialogsChange = () => {
        if (newPost.current) {
            const text = newPost.current.value
            dispatch(updateNewPostDialogText(text))
        }
    }
    

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsPages.dialogsData.map((d) => <DialogsItem key={d.id} id={d.id} name={d.name}/>)}
            </div>

            <div className={s.messages}>
                {dialogsPages.messagesData.map((m) => <Massage key={m.id} message={m.message}/>)}
            </div>

            <div className={s.post}>
                <textarea onChange={onDialogsChange} ref={newPost} className={s.textarea} name="" id="" cols={30}
                          rows={10}></textarea>
                <Button onClick={dialogsPost}/>
            </div>
        </div>
    );
};

