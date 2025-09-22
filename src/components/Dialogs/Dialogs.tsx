import s from './Dialogs.module.css';
import {DialogsItem} from "./DialogsItem/DialogsItem.tsx";
import {Massage} from "./Message/Message.tsx";
import type {ActionType, MessagesPagesType} from "../../redux/state.ts";
import {Button} from "../Button/Button.tsx";
import * as React from "react";


type DialogsPropsType = {
    dialogsPages: MessagesPagesType
    dispatch: (action: ActionType) => void
}

export const Dialogs = ({dialogsPages, dispatch}: DialogsPropsType) => {
    const newPost = React.createRef<HTMLTextAreaElement>();

    function dialogsPost() {
        dispatch({type: 'DIALOGS-ADD-POST'})
    }

    const onDialogsChange = () => {
        if (newPost.current) {
            const text = newPost.current.value
            dispatch({type: 'UPDATE-NEW-DIALOG-TEXT', newDialog: text})
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

