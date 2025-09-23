import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export type ProfileProps = {
    id: number
    message: string
    likeCount: number
}

export type ProfilePagesType = {
    postData: ProfileProps[]
    newPostText: string
}

const initialState: ProfilePagesType = {
        postData: [
            {id: 1, message: "Hi are you", likeCount: 1},
            {id: 2, message: "Hi, I am ok", likeCount: 12},
            {id: 3, message: "Dimasinka", likeCount: 123},
        ],
        newPostText: 'Ksenia'
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addPost(state) {
            state.postData.push({
                id: state.postData.length + 1,
                message: state.newPostText,
                likeCount: 0
            })
            state.newPostText = ''
        },
        updateNewPostText(state, action: PayloadAction<string>) {
            state.newPostText = action.payload
        }
    }
})

export const {addPost, updateNewPostText} = profileSlice.actions
export default profileSlice.reducer;


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


