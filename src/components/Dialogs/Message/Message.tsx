import s from "../Dialogs.module.css";

type MessageProps = {
    message: string;
}

export const Massage = ({message}: MessageProps) => {
    return (
        <div className={s.message}>{message}</div>
    )
}