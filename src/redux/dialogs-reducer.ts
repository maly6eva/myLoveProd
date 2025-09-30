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
            return {
                ...state,
                messagesData: [
                    ...state.messagesData,
                    {
                        id: state.messagesData.length + 1,
                        message: state.newDialogText,
                    }
                ],
                newDialogText: ''
            }
        },
        updateNewPostDialogText(state, action: PayloadAction<string>) {
            return {
                ...state,
                newDialogText: action.payload
            }
        }
    }
})

export const {dialogsAddPost, updateNewPostDialogText} = dialogsSlice.actions;
export default dialogsSlice.reducer;

