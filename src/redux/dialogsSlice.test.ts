import dialogsReducer, { dialogsAddPost, type MessagesPagesType } from "./dialogsSlice"

describe("dialogsSlice", () => {
    let initialState: MessagesPagesType

    beforeEach(() => {
        initialState = {
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
    })

    it ("should return the initial state", () => {
        const result = dialogsReducer(undefined, {type: ""})
        expect(result).toEqual(initialState)
    })

    it("should add a new message when dialogsAddPost is dispatched", () => {
    const action = dialogsAddPost("New message")
        const newState = dialogsReducer(initialState, action)

        expect(newState.messagesData.length).toBe(3)
        expect(newState.messagesData[2]).toEqual({
            id: 3,
            message: "New message",
        })
    })

    it("should not mutate the previous state", () => {
        const action = dialogsAddPost("Immutable test")
        const newState = dialogsReducer(initialState, action)

        expect(initialState.messagesData.length).toBe(2)
        expect(newState).not.toBe(initialState)
    })
})



















// import dialogsReducer, { dialogsAddPost, type MessagesPagesType } from "./dialogsSlice"
//
// describe("dialogsSlice", () => {
//     let initialState: MessagesPagesType
//
//     beforeEach(() => {
//         initialState = {
//             dialogsData: [
//                 { id: 1, name: "Masha" },
//                 { id: 2, name: "Vika" },
//             ],
//             messagesData: [
//                 { id: 1, message: "Hi, I am ok" },
//                 { id: 2, message: "How ara you?" },
//             ],
//             newDialogText: "Dima",
//         }
//     })
//
//     it("should return the initial state", () => {
//         const result = dialogsReducer(undefined, { type: "" })
//         expect(result).toEqual(initialState)
//     })
//
//     it("should add a new message when dialogsAddPost is dispatched", () => {
//         const action = dialogsAddPost("New message")
//         const newState = dialogsReducer(initialState, action)
//
//         expect(newState.messagesData.length).toBe(3)
//         expect(newState.messagesData[2]).toEqual({
//             id: 3,
//             message: "New message",
//         })
//     })
//
//     it("should not mutate the previous state", () => {
//         const action = dialogsAddPost("Immutable test")
//         const newState = dialogsReducer(initialState, action)
//
//         // Проверяем, что старый state не изменился
//         expect(initialState.messagesData.length).toBe(2)
//         expect(newState).not.toBe(initialState)
//     })
// })