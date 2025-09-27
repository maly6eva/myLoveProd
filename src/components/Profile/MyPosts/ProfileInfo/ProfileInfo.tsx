import content from "../../../../images/content.webp"
import mult from "../../../../images/multiashnaia.webp"
import s from './ProfileInfo.module.css'
import type {ProfileType} from "../../../../redux/profile-reducer.ts";
import {Preloader} from "../../../common/Preloader.tsx";

export type ProfileInfoProps = {
    profile: ProfileType | null;
}

export const ProfileInfo = ({profile}: ProfileInfoProps) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <img src={content} className={s.contentImg} alt=""/>
            <div>
                <div className={s.item}>
                    <img className={s.kart} src={profile.photos.large || profile.photos.small || mult}
                         alt={profile.fullName}/>
                    <h2>{profile.fullName}</h2>
                    <p>{profile.aboutMe}</p>
                    <p>
                        {profile.lookingForAJob
                        ? `Ищу работу: ${profile.lookingForAJobDescription}`
                            : "Работу не ищу"
                        }
                    </p>
                    <h2>Контакты:</h2>
                    <p>{profile.contacts.github}</p>
                    <p>{profile.contacts.vk}</p>
                    <p>{profile.contacts.facebook}</p>
                    <p>{profile.contacts.instagram}</p>
                    <p>{profile.contacts.youtube}</p>
                    <p>{profile.contacts.twitter}</p>
                    <p>{profile.contacts.mainLink}</p>
                    <p>{profile.contacts.website}</p>
                </div>
                <div className={s.description}>
                    ava + description
                </div>
            </div>
        </div>
    );
};
