
import content from "../../../../../public/images/content.webp"
import mult from "../../../../../public/images/multiashnaia.webp"
import s from './ProfileInfo.module.css'

export const ProfileInfo = () => {
    return (
        <div>
            <img src={content} className={s.contentImg} alt=""/>
            <div >
                <div className={s.item}>
                    <img className={s.kart} src={mult}  alt=""/>
                </div>
                <div className={s.description}>
                    ava + description
                </div>
            </div>
        </div>
    );
};
