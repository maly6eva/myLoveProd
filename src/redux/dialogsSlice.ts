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
    ],
    messagesData: [
        {id: 1, message: "Hi, I am ok"},
        {id: 2, message: 'How ara you?'},
    ],
    newDialogText: 'Dima'
}

const dialogsSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        dialogsAddPost(state, action: PayloadAction<string>) {
            state.messagesData.push({
                id: state.messagesData.length + 1,
                message: action.payload,
            })
        },
    }
})

export const {dialogsAddPost} = dialogsSlice.actions;
export default dialogsSlice.reducer;

