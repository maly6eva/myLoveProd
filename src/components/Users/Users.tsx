import s from './Users.module.css';
import {Preloader} from "../common/Preloader.tsx";
import {NavLink} from "react-router-dom";
import type {UsersProps} from "../../redux/usersSlice.ts";
import {Pagination} from "../common/Pagination/Pagination.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../redux/redux-store.ts";


type UsersPropsType = {
    usersData: UsersProps[]
    isFetching: boolean
    currentPage: number
    handleUnfollow: (userId: number) => void
    handleFollow: (userId: number) => void
    onClickPage: (page: number) => void
    totalUsersCount: number
    pageSize: number
}

export const Users = ({
                          usersData,
                          isFetching,
                          handleUnfollow,
                          handleFollow,
                          onClickPage,
                          currentPage,
                          totalUsersCount,
                          pageSize,
                      }: UsersPropsType) => {
    const followingInProgress = useSelector(
        (state: RootState) => state.usersPages.followingInProgress)

    return (
        <div>
            <Pagination onClickPage={onClickPage} currentPage={currentPage} totalUsersCount={totalUsersCount}
                        pageSize={pageSize}/>
            {isFetching ? <Preloader/> : null}
            {/* Список пользователей */}
            {usersData.map(u => (
                <div key={u.id} className={s.userItem}>
          <span>
            <div>
            <NavLink to={`/profile/${u.id}`}>
                  <img src={u.photo} alt="" className={s.photoImg}/>
            </NavLink>
            </div>
            <div>
              {u.followed
                  ? <button disabled={followingInProgress.includes(u.id)} onClick={() => handleUnfollow(u.id)}
                  >Unfollow</button>
                  : <button disabled={followingInProgress.includes(u.id)} onClick={() => handleFollow(u.id)}
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

