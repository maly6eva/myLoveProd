// import {profileReducer, type ProfileActionType} from "./profile-reducer.ts";
// import {type DialogsActionType, dialogsReducer} from "./dialogs-reducer.ts";
//
// export type StateTypeProps = {
//     profilePages: ProfilePagesType
//     dialogsPages: MessagesPagesType
// }
// //
// export type ProfilePagesType = {
//     postData: ProfileProps[]
//     newPostText: string
// }
// //
// export type MessagesPagesType = {
//     dialogsData: DialogsProps[]
//     messagesData: MessagesDataProps[]
//     newDialogText: string
// }
// //
// export type ProfileProps = {
//     id: number
//     message: string
//     likeCount: number
// }
// //
// export type DialogsProps = {
//     id: number
//     name: string
// }
//
// export type MessagesDataProps = {
//     id: number,
//     message: string
// }
// //
// export type ActionType =  ProfileActionType | DialogsActionType
//
// export const store = {
//     _state: {
//         profilePages: {
//             postData: [
//                 {id: 1, message: "Hi are you", likeCount: 1},
//                 {id: 2, message: "Hi, I am ok", likeCount: 12},
//                 {id: 3, message: "Dimasinka", likeCount: 123},
//             ],
//             newPostText: 'Ksenia'
//         },
//         dialogsPages: {
//             dialogsData: [
//                 {id: 1, name: "Masha"},
//                 {id: 2, name: "Vika"},
//                 {id: 3, name: "Lina"},
//                 {id: 4, name: "Natasha"},
//                 {id: 5, name: "Kira"},
//                 {id: 6, name: "Masha"},
//             ],
//             messagesData: [
//                 {id: 1, message: "Hi, I am ok"},
//                 {id: 2, message: 'How ara you?'},
//                 {id: 3, message: "Hi, I am ok"},
//                 {id: 4, message: "Hi!"},
//                 {id: 5, message: "Yo"},
//             ],
//             newDialogText: 'Dima'
//         },
//     } as StateTypeProps,
//     _callSubscriber: (_state: StateTypeProps) => {
//         console.log("rerenderEntireTree");
//     },
//
//     getState() {
//         return this._state;
//     },
//     subscribe(observer: (state: StateTypeProps) => void) {
//         this._callSubscriber = observer;
//     },
//
//     dispatch(action: ActionType) {
//         if (action.type === 'ADD-POST' || action.type === 'UPDATE-NEW-POST-TEXT') {
//             this._state.profilePages = profileReducer(this._state.profilePages, action);
//         }
//         if (action.type === 'DIALOGS-ADD-POST' || action.type === 'UPDATE-NEW-DIALOG-TEXT') {
//             this._state.dialogsPages = dialogsReducer(this._state.dialogsPages, action);
//         }
//         this._callSubscriber(this._state);
//     }
// }



