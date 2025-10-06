// import {MyPosts} from "./MyPosts/MyPosts.jsx";
// import {ProfileInfo} from "./MyPosts/ProfileInfo/ProfileInfo.tsx";
// import {useDispatch, useSelector} from "react-redux";
// import type {AppDispatch, RootState} from "../../redux/redux-store.ts";
// import {memo, useEffect} from "react";
// import {getProfile, getStatus} from "../../redux/profileSlice.ts";
// import {useParams} from "react-router-dom";
//
//
//
// export const Profile = memo(() => {
//     const dispatch = useDispatch<AppDispatch>()
//     const profile = useSelector((state: RootState) => state.profilePages.profile)
//     const authUserId = useSelector((state: RootState) => state.auth.userId)
//
//     // Берём userId из URL
//     const { userId } = useParams<{ userId: string }>()
//
//     useEffect(() => {
//         const id = userId ? Number(userId) : userId
//         if (id === null || isNaN(Number(id))) return; // если нет id, не делаем запрос
//
//         dispatch(getProfile(Number(id)));
//         dispatch(getStatus(Number(id)))
//
//     }, [dispatch, userId, authUserId])
//
//
//     return (
//         <div>
//             <ProfileInfo profile={profile}/>
//             <MyPosts/>
//         </div>
//     );
// });

import {MyPosts} from "./MyPosts/MyPosts.jsx";
import {ProfileInfo} from "./MyPosts/ProfileInfo/ProfileInfo.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../redux/redux-store.ts";
import {memo, useEffect} from "react";
import {getProfile, getStatus} from "../../redux/profileSlice.ts";
import {useParams} from "react-router-dom";
import {Preloader} from "../common/Preloader.tsx";



export const Profile = memo(() => {
    const dispatch = useDispatch<AppDispatch>()

    const {profile,  loading, error } = useSelector((state: RootState) => state.profilePages)
    const authUserId = useSelector((state: RootState) => state.auth.userId)

    // Берём userId из URL
    const { userId } = useParams<{ userId: string }>()

    useEffect(() => {
        const id = userId ? Number(userId) : authUserId
        if (!id ) return; // если нет id, не делаем запрос

        dispatch(getProfile((id)));
        dispatch(getStatus((id)))

    }, [dispatch, userId, authUserId])

    if (loading) return <Preloader />;

    if (error) return <div style={{ color: "red" }}>Ошибка загрузки профиля: {error}</div>;

    return (
        <div>
            <ProfileInfo profile={profile}/>
            <MyPosts/>
        </div>
    );
});
