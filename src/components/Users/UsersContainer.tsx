import {useSelector, useDispatch} from "react-redux";
import type {RootState, AppDispatch} from '../../redux/redux-store.ts';
import {
    setCurrentPage,
    fetchUsers, followUser, unfollowUser
} from '../../redux/users-reducer';
import {useEffect} from "react";
import {Users} from "./Users.tsx";


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
        dispatch(fetchUsers({page: currentPage, pageSize}))
    },           [dispatch, currentPage, pageSize]);

        const handleFollow =  (userId: number) => {
            dispatch(followUser(userId))
        }

        const handleUnfollow = (userId: number) => {
            dispatch(unfollowUser(userId))
        }

        const onClickPage = (page: number) => {
            dispatch(setCurrentPage(page))
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

