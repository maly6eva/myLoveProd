import s from './Users.module.css';
import {Preloader} from "../common/Preloader.tsx";
import {NavLink} from "react-router-dom";
import type {UsersProps} from "../../redux/users-reducer.ts";
import {Pagination} from "../common/Pagination/Pagination.tsx";


type UsersPropsType  = {
    usersData: UsersProps[]
    isFetching: boolean
    currentPage: number
    handleUnfollow: (userId: number) => void
    handleFollow: (userId: number) => void
    onClickPage: (page: number) => void
    totalUsersCount: number
    pageSize: number
}

export const Users = ({ usersData, isFetching, handleUnfollow, handleFollow, onClickPage,  currentPage, totalUsersCount, pageSize }: UsersPropsType) => {

    return (
        <div>
            <Pagination onClickPage={onClickPage} currentPage={currentPage} totalUsersCount={totalUsersCount} pageSize={pageSize}/>
            {isFetching ? <Preloader/> : null}
            {/* Список пользователей */}
            {usersData.map(u => (
                <div key={u.id} className={s.userItem}>
          <span>
            <div>
                gebuger
            <NavLink to={`/profile/${u.id}`}>
                  <img src={u.photo} alt="" className={s.photoImg}/>
            </NavLink>
            </div>
            <div>
              {u.followed
                  ? <button onClick={() =>  handleUnfollow(u.id)}
                  >Unfollow</button>
                  : <button onClick={() => handleFollow(u.id)}
                  >Follow</button>}
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

