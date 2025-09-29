import {createSlice, type PayloadAction} from "@reduxjs/toolkit";


export type LocationProps = {
    city: string
    country: string
}

export type UsersProps = {
    id: number
    followed: boolean
    photo: string
    fullName: string
    status: string
    location: LocationProps
}

export type UsersPropsType = {
    usersData: UsersProps[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: boolean
}

const initialState: UsersPropsType = {
    usersData: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: false
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        follow(state, action: PayloadAction<number>) {
            state.usersData = state.usersData.map(u =>
                u.id === action.payload ? {...u, followed: true} : u
            )
        },
        unfollow(state, action: PayloadAction<number>) {
            state.usersData = state.usersData.map(u =>
                u.id === action.payload ? {...u, followed: false} : u
            )
        },
        setusers(state, action: PayloadAction<UsersProps[]>) {
            state.usersData = action.payload

        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setTotalUserCount(state, action: PayloadAction<number>){
            state.totalUsersCount = action.payload
        },
        toggleIsFetching(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload
        },
        toggleIsFollowingProgress(state, action: PayloadAction<boolean>) {
            state.followingInProgress = action.payload
        }
    }
})

export const {follow, unfollow, setusers, setCurrentPage,  setTotalUserCount,  toggleIsFetching, toggleIsFollowingProgress} = usersSlice.actions
export default usersSlice.reducer;


