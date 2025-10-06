import content from "../../../../images/content.webp"
import mult from "../../../../images/multiashnaia.webp"
import s from './ProfileInfo.module.css'
import type {ProfileType} from "../../../../redux/profileSlice.ts";
import {Preloader} from "../../../common/Preloader.tsx";
import {ProfileStatus} from "../../ProfileStatus.tsx";
import { memo } from "react";

export type ProfileInfoProps = {
    profile: ProfileType | null;
}

export const ProfileInfo = memo(({profile}: ProfileInfoProps) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <img src={content} className={s.contentImg} alt=""/>
            <div>
                <div className={s.item}>
                    <img className={s.kart}
                         src={profile.photos.large || profile.photos.small || mult}
                         alt={profile.fullName}/>
                    <ProfileStatus/>
                    <h2>{profile.fullName}</h2>
                    <p>{profile.aboutMe || "Информация о себе отсутствует."}</p>
                    <p>
                        {profile.lookingForAJob
                        ? `Ищу работу: ${profile.lookingForAJobDescription}`
                            : "Работу не ищу"
                        }
                    </p>
                    <h2>Контакты:</h2>
                    {Object.entries(profile.contacts).map(([key, value]) => (
                        <p key={key}>
                            <strong>{key}:</strong> {value || "нет"}
                        </p>
                    ))}
                </div>
                <div className={s.description}>
                    ava + description
                </div>
            </div>
        </div>
    )
});
