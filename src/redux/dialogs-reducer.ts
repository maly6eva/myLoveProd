import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
export type DialogsProps = {
    id: number
    name: string
}

export type MessagesDataProps = {
    id: number,
    message: string
}

export type MessagesPagesType = {
    dialogsData: DialogsProps[]
    messagesData: MessagesDataProps[]
    newDialogText: string
}

const initialState: MessagesPagesType = {
    dialogsData: [
        {id: 1, name: "Masha"},
        {id: 2, name: "Vika"},
        {id: 3, name: "Lina"},
        {id: 4, name: "Natasha"},
        {id: 5, name: "Kira"},
        {id: 6, name: "Masha"},
    ],
    messagesData: [
        {id: 1, message: "Hi, I am ok"},
        {id: 2, message: 'How ara you?'},
        {id: 3, message: "Hi, I am ok"},
        {id: 4, message: "Hi!"},
        {id: 5, message: "Yo"},
    ],
    newDialogText: 'Dima'
}

const dialogsSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        dialogsAddPost(state) {
            state.messagesData.push({
                id: state.messagesData.length + 1,
                message: state.newDialogText,
            })
            state.newDialogText = ""
        },
        updateNewPostDialogText(state, action: PayloadAction<string>) {
            state.newDialogText = action.payload

        }

    }
})

export const { dialogsAddPost, updateNewPostDialogText} = dialogsSlice.actions;
export default dialogsSlice.reducer;


// import type {MessagesPagesType} from "./state.ts";
//
//
// const DIALOGS_ADD_POST = 'DIALOGS-ADD-POST' as const;
// const UPDATE_NEW_DIALOG_TEXT = 'UPDATE-NEW-DIALOG-TEXT' as const;
//
//
// export type DialogsAddPostAction = { type: typeof DIALOGS_ADD_POST }
// export type UpdateNewDialogTextAction = { type: typeof UPDATE_NEW_DIALOG_TEXT; newDialog: string }
//
// export type DialogsActionType = DialogsAddPostAction | UpdateNewDialogTextAction
//
//
// export const dialogsReducer = (
//     state: MessagesPagesType ,
//     action: DialogsActionType
// ): MessagesPagesType => {
//     switch (action.type) {
//         case DIALOGS_ADD_POST: {
//             const newDialog = {
//                 id: state.messagesData.length + 1,
//                 message: state.newDialogText,
//             };
//             return {
//                 ...state,
//                 messagesData: [...state.messagesData, newDialog],
//                 newDialogText: "",
//             };
//         }
//         case UPDATE_NEW_DIALOG_TEXT:
//             return {
//                 ...state,
//                 newDialogText: action.newDialog,
//             };
//         default:
//             return state;
//     }
// };
//
// export const addDialogActionCreator = () => ({
//     type: 'DIALOGS-ADD-POST' as const
// })
//
// export const updateNewDialogElements = (text: string) => ({
//     type: 'UPDATE-NEW-DIALOG-TEXT' as const,
//     newDialog: text
// })

