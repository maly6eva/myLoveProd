import s from './Dialogs.module.css';
import {DialogsItem} from "./DialogsItem/DialogsItem.tsx";
import {Massage} from "./Message/Message.tsx";
import { useSelector} from "react-redux";
import type {RootState} from "../../redux/redux-store.ts";
import {DialogsTextarea} from "./DialogsTextarea.tsx";
import {memo} from "react";


export const Dialogs = memo(() => {
    const dialogsPages = useSelector((state: RootState) => state.dialogsPages)




    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsPages.dialogsData.map((d) => <DialogsItem key={d.id} id={d.id} name={d.name}/>)}
            </div>

            <div className={s.messages}>
                {dialogsPages.messagesData.map((m) => <Massage key={m.id} message={m.message}/>)}
            </div>

            <div className={s.post}>
                <DialogsTextarea/>
            </div>
        </div>
    );
});


