import {useSelector} from "react-redux";
import type {RootState} from '../../redux/redux-store.ts'
import s from './Users.module.css'
import {follow, setusers, unfollow} from '../../redux/users-reducer'
import {useDispatch} from 'react-redux'
import type {AppDispatch} from '../../redux/redux-store'
import axios from "axios";
import {useEffect} from "react";

type PhotosProps = {
    small: null | string,
    large: null | string
}

type UsersAPIProps = {
    name: string,
    id: number,
    uniqueUrlName: string | null,
    photos: PhotosProps,
    status: null | string,
    followed: boolean
}

type UsersAPIPropsTypes = {
    items: UsersAPIProps[],
    totalCount: number,
    error: null | string
}


export const Users = () => {
    const dispatch = useDispatch<AppDispatch>()
    const usersPages = useSelector((state: RootState) => state.usersPages)

    useEffect(() => {
        if (usersPages.usersData.length === 0) {
            const fetchUsers = async () => {
                try {
                    const response = await axios.get<UsersAPIPropsTypes>("/api/users")
                    const mappedUsers = response.data.items.map((u) => ({
                        id: u.id,
                        followed: u.followed,
                        fullName: u.name,
                        status: u.status || "No status",
                        photo: u.photos.small || "/images/aVa.webp",
                        location: {
                            country: "Belarus",
                            city: "Minsk"
                        }
                    }))
                    dispatch(setusers(mappedUsers))
                } catch (err) {
                    console.error("Ошибка при загрузке пользователей:", err)
                }
            }
            fetchUsers()
        }
    }, [dispatch, usersPages.usersData.length])


    return (
        <div>
            {usersPages.usersData.map((u) => {
                return (
                    <div key={u.id}>
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
                )
            })}
        </div>
    )
}