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
}

const initialState: UsersPropsType = {
    usersData: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
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
        }
    }
})

export const {follow, unfollow, setusers, setCurrentPage,  setTotalUserCount,  toggleIsFetching} = usersSlice.actions
export default usersSlice.reducer;


// const profileSlice = createSlice({
//     name: 'profile',
//     initialState,
//     reducers: {
//         addPost(state) {
//             state.postData.push({
//                 id: state.postData.length + 1,
//                 message: state.newPostText,
//                 likeCount: 0
//             })
//             state.newPostText = ''
//         },
//         updateNewPostText(state, action: PayloadAction<string>) {
//             state.newPostText = action.payload
//         }
//     }
// })


// import type {ProfilePagesType} from "./state.ts";
//
// const ADD_POST = 'ADD-POST' as const;
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT' as const;
//
// export type AddPostAction = { type: typeof ADD_POST }
// export type UpdateNewPostTextAction = { type: typeof UPDATE_NEW_POST_TEXT; newPost: string }
//
// export type ProfileActionType = AddPostAction | UpdateNewPostTextAction
//
// export const profileReducer = (
//     state: ProfilePagesType,
//     action: ProfileActionType
// ): ProfilePagesType => {
//     switch (action.type) {
//         case ADD_POST: {
//             const newPost = {
//                 id: state.postData.length + 1,
//                 message: state.newPostText,
//                 likeCount: 0
//             };
//             return {
//                 ...state,
//                 postData: [...state.postData, newPost],
//                 newPostText: ''
//             };
//         }
//         case UPDATE_NEW_POST_TEXT:
//             return {
//                 ...state,
//                 newPostText: action.newPost
//             };
//         default:
//             return state;
//     }
// }
//
//
// export const addPostActionCreator = () => (
//     {type: ADD_POST} as const
// )
//
// export const updateNewPostsElements = (text: string) => {
//     return {
//         type: UPDATE_NEW_POST_TEXT,
//         newPost: text
//     }as const
// }


