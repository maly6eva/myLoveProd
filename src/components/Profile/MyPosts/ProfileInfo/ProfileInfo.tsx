import {memo, useState, useRef, useEffect, type ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../../../redux/redux-store";
import type {ProfileType, ContactsType} from "../../../../redux/profileSlice";
import {updateProfileThunk} from "../../../../redux/profileSlice";
import {Preloader} from "../../../common/Preloader";
import {ProfileStatus} from "../../ProfileStatus";
import {Button} from "../../../Button/Button";
import mult from "../../../../images/multiashnaia.webp";
import s from "./ProfileInfo.module.css";

export type ProfileInfoProps = {
    profile: ProfileType | null;
};

export const ProfileInfo = memo(({profile}: ProfileInfoProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [editField, setEditField] = useState<keyof ProfileType | keyof ContactsType | null>(null);
    const [tempValue, setTempValue] = useState<string>("");
    const [mistake, setMistake] = useState<string>("");

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editField && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [editField]);

    if (!profile) return <Preloader/>;

    const {fullName, aboutMe, lookingForAJob, lookingForAJobDescription, contacts, photos} = profile;

    const handleEditClick = (fieldName: keyof ProfileType | keyof ContactsType, currentValue: string) => {
        setEditField(fieldName);
        setTempValue(currentValue || "");
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTempValue(e.target.value);
    };


    const handleSave = async () => {
        if (!profile || !editField) return;

        const newValue = tempValue.trim();

        const updatedProfile: ProfileType = {
            ...profile,
            fullName: profile.fullName || "",
            aboutMe: profile.aboutMe || "",
            lookingForAJob: profile.lookingForAJob ?? false,
            lookingForAJobDescription: profile.lookingForAJobDescription || "",
            contacts: {...profile.contacts},
            photos: {...profile.photos},
        };

        const validateUrl = (value: string): string | null => {
            if (!value) return null;
            try {
                const trimmed = value.trim();

                const hasProtocol = /^https?:\/\//i.test(trimmed);
                const urlToCheck = hasProtocol ? trimmed : `https://${trimmed}`;

                const valid = new URL(urlToCheck);
                return valid.href;
            } catch {
                return null;
            }
        };

        if (editField in updatedProfile.contacts) {
            updatedProfile.contacts = {
                ...updatedProfile.contacts,
                [editField as keyof ContactsType]: validateUrl(newValue),
            };
        } else if (editField === "aboutMe") {
            updatedProfile.aboutMe = newValue || "О себе не указано";
        } else if (editField === "fullName") {
            updatedProfile.fullName = newValue || "Без имени";
        } else if (editField === "lookingForAJobDescription") {
            // включаем поиск работы
            updatedProfile.lookingForAJob = true;
            updatedProfile.lookingForAJobDescription = newValue || "Описание не указано";
        }

        console.log("📤 Отправляем профиль:", updatedProfile);

        try {
            await dispatch(updateProfileThunk(updatedProfile)).unwrap();
            setEditField(null);
        } catch (err) {
            console.error("❌ Ошибка при обновлении профиля:", err);
            setMistake("Ошибка при обновлении профиля. Возможно, неверный URL.");
        }
    };

    return (
        <div className={s.profileContainer}>
            <div className={s.profileMain}>
                <div className={s.profileHeader}>
                    <img className={s.avatar} src={photos.large || photos.small || mult} alt={fullName}/>
                    <ProfileStatus/>
                </div>

                <h2 style={{color: "red"}}>{mistake}</h2>

                <div className={s.profileInfo}>
                    <h2>
                        {editField === "fullName" ? (
                            <>
                                <input ref={inputRef} value={tempValue} onChange={handleChange}/>
                                <Button onClick={handleSave} text="Сохранить" numb="three"/>
                            </>
                        ) : (
                            <>
                                {fullName}{" "}
                                <Button onClick={() => handleEditClick("fullName", fullName)} text="Править"/>
                            </>
                        )}
                    </h2>

                    <p>
                        <strong>О себе:</strong>{" "}
                        {editField === "aboutMe" ? (
                            <>
                                <input ref={inputRef} value={tempValue} onChange={handleChange}/>
                                <Button onClick={handleSave} text="Сохранить" numb="three"/>
                            </>
                        ) : (
                            <>
                                {aboutMe || "Информация о себе отсутствует."}{" "}
                                <Button onClick={() => handleEditClick("aboutMe", aboutMe || "")} text="Править"/>
                            </>
                        )}
                    </p>

                    <p>
                        <strong>Поиск работы:</strong>{" "}
                        {editField === "lookingForAJobDescription" ? (
                            <>
                                <input ref={inputRef} value={tempValue} onChange={handleChange}/>
                                <Button onClick={handleSave} text="Сохранить" numb="three"/>
                            </>
                        ) : (
                            <>
                                {lookingForAJob
                                    ? lookingForAJobDescription || "Описание не указано"
                                    : "Работу не ищу"}{" "}
                                <Button
                                    onClick={() =>
                                        handleEditClick(
                                            "lookingForAJobDescription",
                                            lookingForAJobDescription || ""
                                        )
                                    }
                                    text="Править"
                                />
                            </>
                        )}
                    </p>

                    <h3>Контакты:</h3>
                    <ul className={s.contacts}>
                        {Object.entries(contacts).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong>{" "}
                                {editField === key ? (
                                    <>
                                        <input
                                            ref={inputRef}
                                            value={tempValue}
                                            onChange={handleChange}
                                            placeholder="Введите URL"
                                        />
                                        <Button onClick={handleSave} text="Сохранить" numb="two"/>
                                    </>
                                ) : (
                                    <>
                                        {value ? value.replace(/^https?:\/\//i, '') : "нет"}{" "}
                                        <Button
                                            onClick={() => handleEditClick(key as keyof ContactsType, value || "")}
                                            text="Править"
                                            numb="one"
                                        />
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
});