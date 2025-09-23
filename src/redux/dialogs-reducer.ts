import type {MessagesPagesType} from "./state.ts";


const DIALOGS_ADD_POST = 'DIALOGS-ADD-POST' as const;
const UPDATE_NEW_DIALOG_TEXT = 'UPDATE-NEW-DIALOG-TEXT' as const;


export type DialogsAddPostAction = { type: typeof DIALOGS_ADD_POST }
export type UpdateNewDialogTextAction = { type: typeof UPDATE_NEW_DIALOG_TEXT; newDialog: string }

export type DialogsActionType = DialogsAddPostAction | UpdateNewDialogTextAction


export const dialogsReducer = (
    state: MessagesPagesType ,
    action: DialogsActionType
): MessagesPagesType => {
    switch (action.type) {
        case DIALOGS_ADD_POST: {
            const newDialog = {
                id: state.messagesData.length + 1,
                message: state.newDialogText,
            };
            return {
                ...state,
                messagesData: [...state.messagesData, newDialog],
                newDialogText: "",
            };
        }
        case UPDATE_NEW_DIALOG_TEXT:
            return {
                ...state,
                newDialogText: action.newDialog,
            };
        default:
            return state;
    }
};

export const addDialogActionCreator = () => ({
    type: 'DIALOGS-ADD-POST' as const
})

export const updateNewDialogElements = (text: string) => ({
    type: 'UPDATE-NEW-DIALOG-TEXT' as const,
    newDialog: text
})

