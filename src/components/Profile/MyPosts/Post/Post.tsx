
import s from './Post.module.css'
import kart from "../../../../../public/images/kart.webp";


type PostProps = {
    message: string;
    likeCount: number;
}

export const Post = ({message, likeCount}:  PostProps ) => {
    return (
        <div className={s.item}>
            <img className={s.kart} src={kart} alt=""/>
            {message}
            <div>
                <span>like {likeCount}</span>
            </div>
        </div>
    );
};

