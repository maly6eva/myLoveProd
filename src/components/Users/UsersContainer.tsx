import {useSelector, useDispatch} from "react-redux";
import type {RootState, AppDispatch} from '../../redux/redux-store.ts';
import aVa from "../../images/aVa.webp"
import {
    follow,
    unfollow,
    setusers,
    setCurrentPage,
    setTotalUserCount,
    toggleIsFetching,
    toggleIsFollowingProgress
} from '../../redux/users-reducer';
import axios from "axios";
import {useEffect} from "react";
import {Users} from "./Users.tsx";


type FollowResponse = {
    resultCode: number
}

type PhotosProps = { small: string | null, large: string | null }

type UsersAPIProps = {
    name: string,
    id: number,
    uniqueUrlName: string | null,
    photos: PhotosProps,
    status: string | null,
    followed: boolean
}

type UsersAPIPropsTypes = {
    items: UsersAPIProps[],
    totalCount: number,
    error: string | null
}

export const UsersContainer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        usersData,
        pageSize,
        currentPage,
        isFetching,
        totalUsersCount
    } = useSelector((state: RootState) => state.usersPages);

    // Загрузка пользователей с API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                dispatch(toggleIsFetching(true))
                const response = await axios.get<UsersAPIPropsTypes>(`/api/users?page=${currentPage}&count=${pageSize}`);
                const mappedUsers = response.data.items.map(u => ({
                    id: u.id,
                    followed: u.followed,
                    fullName: u.name,
                    status: u.status || "No status",
                    photo: u.photos.small || aVa,
                    location: {country: "Belarus", city: "Minsk"}
                }));
                dispatch(setusers(mappedUsers));
                dispatch(setTotalUserCount(response.data.totalCount));

            } catch (err) {
                console.error("Ошибка при загрузке пользователей:", err);
            } finally {
                dispatch(toggleIsFetching(false))
            }
        }
        fetchUsers();
    }, [dispatch, currentPage, pageSize]);

    const handleUnfollow = async (userId: number) => {
        dispatch(toggleIsFollowingProgress(true))
        try {
            const response = await axios.delete<FollowResponse>(
                `/api/follow/${userId}`,
                {
                    withCredentials: true,
                    headers: {
                        "API-KEY": "5ee5c717-0079-4390-a456-8cc718967925"
                    },
                }
            );
            if ( response.data.resultCode === 0) {
                dispatch(unfollow(userId))
            }
        }catch(err) {
            console.error("Ошибки", err)
        }finally{
            dispatch( toggleIsFollowingProgress(false))
        }
    }

    const handleFollow = async (userId: number) => {
        dispatch(toggleIsFollowingProgress(true))
        try {
            const response = await axios.post<FollowResponse>(
                `/api/follow/${userId}`,
                {},
                {
                    withCredentials: true,
                    headers: {
                        "API-KEY": "5ee5c717-0079-4390-a456-8cc718967925"
                    }
                }
            )
            if (response.data.resultCode === 0) {
                dispatch(follow(userId))
            }
        } catch (err) {
            console.error("Ошибка при Follow:", err)
        }finally{
            dispatch( toggleIsFollowingProgress(false))
        }
    }

    const onClickPage = (page: number) => {
        dispatch(setCurrentPage(page));
    }

    return (
       <Users
           usersData={ usersData}
           isFetching={isFetching}
           handleUnfollow={handleUnfollow}
           handleFollow={handleFollow}
           onClickPage={onClickPage}
           currentPage={currentPage}
           totalUsersCount={totalUsersCount}
           pageSize={pageSize}
       />
    );
};

