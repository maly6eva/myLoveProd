import {useSelector, useDispatch} from "react-redux";
import type {RootState, AppDispatch} from '../../redux/redux-store.ts';
import s from './Users.module.css';
import aVa from "../../images/aVa.webp"
import {
    follow,
    unfollow,
    setusers,
    setCurrentPage,
    setTotalUserCount,
    toggleIsFetching
} from '../../redux/users-reducer';
import axios from "axios";
import {useEffect} from "react";
import {Preloader} from "../common/Preloader.tsx";


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

export const Users = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {usersData, pageSize, totalUsersCount, currentPage, isFetching} = useSelector((state: RootState) => state.usersPages);

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
            }finally{
                dispatch(       toggleIsFetching(false))
            }
        }
        fetchUsers();
    }, [dispatch, currentPage, pageSize]);

    // // Пагинация
    const blockSize = 5;
    const pagesCount = Math.ceil(totalUsersCount / pageSize);

    const currentBlock = Math.ceil(currentPage / blockSize);

    const startPage = (currentBlock - 1) * blockSize + 1;
    const endPage = Math.min(currentBlock * blockSize, pagesCount);
    //
    const pages: (number | string)[] = [];

    // Первая страница и "..."
    if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
    }

    // Текущий блок страниц
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    // "..." и последняя страница
    if (endPage < pagesCount) {
        if (endPage < pagesCount - 1) pages.push("...");
        pages.push(pagesCount);
    }

    const onClickPage = (page: number) => {
        dispatch(setCurrentPage(page));
    }

    return (
        <div>
            {/* Пагинация */}
            <div style={{display: "flex", gap: "8px", marginBottom: "10px"}}>
                {pages.map((p, i) =>
                        p === "..." ? (
                            <span key={`dots-${i}`}> ... </span>
                        ) : (
                            <span
                                key={p}
                                className={currentPage === p ? s.selectedPage : ''}
                                onClick={() => onClickPage(p as number)}
                                style={{cursor: "pointer"}}>
              {p}
            </span>
                        )
                )}
            </div>


            {isFetching ? <Preloader/> : null}
            {/* Список пользователей */}
            {usersData.map(u => (
                <div key={u.id} className={s.userItem}>
          <span>
            <div>
              <img src={u.photo} alt="" className={s.photoImg}/>
            </div>
            <div>
              {u.followed
                  ? <button onClick={() => dispatch(unfollow(u.id))}>Unfollow</button>
                  : <button onClick={() => dispatch(follow(u.id))}>Follow</button>}
            </div>
          </span>
                    <span>
            <span>
              <div>{u.fullName}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{u.location.city}</div>
              <div>{u.location.country}</div>
            </span>
          </span>
                </div>
            ))}
        </div>
    );
}

