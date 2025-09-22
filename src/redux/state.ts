export type StateTypeProps = {
    profilePages: ProfilePagesType
    dialogsPages: MessagesPagesType
}

export type ProfilePagesType = {
    postData: ProfileProps[]
    newPostText: string
}

export type MessagesPagesType = {
    dialogsData: DialogsProps[]
    messagesData: MessagesDataProps[]
    newDialogText: string
}

export type ProfileProps = {
    id: number
    message: string
    likeCount: number
}

export type DialogsProps = {
    id: number
    name: string
}

export type MessagesDataProps = {
    id: number,
    message: string
}

type AddPostAction = { type: 'ADD-POST' }
type UpdateNewPostTextAction = { type: 'UPDATE-NEW-POST-TEXT'; newPost: string }
type DialogsAddPostAction = { type: 'DIALOGS-ADD-POST' }
type UpdateNewDialogTextAction = { type: 'UPDATE-NEW-DIALOG-TEXT'; newDialog: string }

export type ActionType =
    | AddPostAction
    | UpdateNewPostTextAction
    | DialogsAddPostAction
    | UpdateNewDialogTextAction

export const addPostAC = (): AddPostAction => ({type: 'ADD-POST'})
export const updateNewPostTextAC = (newPost: string): UpdateNewPostTextAction => ({
    type: 'UPDATE-NEW-POST-TEXT',
    newPost
})
export const dialogsAddPostAC = (): DialogsAddPostAction => ({type: 'DIALOGS-ADD-POST'})
export const updateNewDialogTextAC = (newDialog: string): UpdateNewDialogTextAction => ({
    type: 'UPDATE-NEW-DIALOG-TEXT',
    newDialog
})

export const store = {
    _state: {
        profilePages: {
            postData: [
                {id: 1, message: "Hi are you", likeCount: 1},
                {id: 2, message: "Hi, I am ok", likeCount: 12},
                {id: 3, message: "Dimasinka", likeCount: 123},
            ],
            newPostText: 'Ksenia'
        },
        dialogsPages: {
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
    } as StateTypeProps,
    _callSubscriber: (_state: StateTypeProps) => {
        console.log("rerenderEntireTree");
    },

    getState() {
        return this._state;
    },
    subscribe(observer: (state: StateTypeProps) => void) {
        this._callSubscriber = observer;
    },

    dispatch(action: ActionType) {
        if (action.type === 'ADD-POST') {
            const newPost = {
                id: this._state.profilePages.postData.length + 1,
                message: this._state.profilePages.newPostText,
                likeCount: 0
            }
            this._state.profilePages.postData.push(newPost);
            this._state.profilePages.newPostText = ''
            this._callSubscriber(this._state)
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePages.newPostText = action.newPost
            this._callSubscriber(this._state)
        } else if (action.type === 'DIALOGS-ADD-POST') {
            const newDialog = {
                id: this._state.dialogsPages.messagesData.length + 1,
                message: this._state.dialogsPages.newDialogText
            }
            this._state.dialogsPages.messagesData.push(newDialog)
            this._state.dialogsPages.newDialogText = ''
            this._callSubscriber(this._state)
        } else if (action.type === 'UPDATE-NEW-DIALOG-TEXT') {
            this._state.dialogsPages.newDialogText = action.newDialog
            this._callSubscriber(this._state)
        }
    }
}














