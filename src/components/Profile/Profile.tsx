import {MyPosts} from "./MyPosts/MyPosts.jsx";
import {ProfileInfo} from "./MyPosts/ProfileInfo/ProfileInfo.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../redux/redux-store.ts";
import {useEffect} from "react";
import {getProfile, getStatus} from "../../redux/profile-reducer.ts";
import {useParams} from "react-router-dom";



export const Profile = () => {
    const dispatch = useDispatch<AppDispatch>()
    const profilePages = useSelector((state: RootState) => state.profilePages)

    // Берём userId из URL
    const { userId } = useParams<{ userId: string }>()

    useEffect(() => {
        if (!userId) return; // если нет userId, не делаем запрос

        dispatch(getProfile(Number(userId)));
        dispatch(getStatus(Number(userId)))

    }, [dispatch, userId])


    return (
        <div>
            <ProfileInfo profile={profilePages.profile}/>
            <MyPosts/>
        </div>
    );
};

