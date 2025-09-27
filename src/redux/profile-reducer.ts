import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export type ProfileProps = {
    id: number
    message: string
    likeCount: number
}

export type PhotosProps = {
    small: string | null
    large: string | null
}


export type ContactsType = {
    facebook:  string | null
    website:  string | null
    vk:  string | null
    twitter:  string | null
    instagram:  string | null
    youtube:  string | null
    github:  string | null
    mainLink:  string | null
}

export type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosProps
}

export type ProfilePagesType = {
    postData: ProfileProps[]
    newPostText: string
    profile: ProfileType | null
}

const initialState: ProfilePagesType = {
    postData: [
        {id: 1, message: "Hi are you", likeCount: 1},
        {id: 2, message: "Hi, I am ok", likeCount: 12},
        {id: 3, message: "Dimasinka", likeCount: 123},
    ],
    newPostText: 'Ksenia',
    profile: null
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addPost(state) {
            return {
                ...state,
                postData: [
                    ...state.postData,
                    {
                        id: state.postData.length + 1,
                        message: state.newPostText,
                        likeCount: 0
                    }
                ],
                newPostText: ''

            }
        },
        updateNewPostText(state, action: PayloadAction<string>) {
            return {
                ...state,
                newPostText: action.payload
            }
        },
        setUserProfile(state, action: PayloadAction<ProfileType>){
            state.profile = action.payload
        }
    }
})

export const {addPost, updateNewPostText, setUserProfile} = profileSlice.actions
export default profileSlice.reducer;


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


