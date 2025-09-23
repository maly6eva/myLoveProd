import type {ProfilePagesType} from "./state.ts";

const ADD_POST = 'ADD-POST' as const;
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT' as const;

export type AddPostAction = { type: typeof ADD_POST }
export type UpdateNewPostTextAction = { type: typeof UPDATE_NEW_POST_TEXT; newPost: string }

export type ProfileActionType = AddPostAction | UpdateNewPostTextAction

export const profileReducer = (
    state: ProfilePagesType,
    action: ProfileActionType
): ProfilePagesType => {
    switch (action.type) {
        case ADD_POST: {
            const newPost = {
                id: state.postData.length + 1,
                message: state.newPostText,
                likeCount: 0
            };
            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: ''
            };
        }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newPost
            };
        default:
            return state;
    }
}


export const addPostActionCreator = () => (
    {type: ADD_POST} as const
)

export const updateNewPostsElements = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newPost: text
    }as const
}


