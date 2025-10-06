import reducer, {
    addPost,
    setUserProfile,
    setStatus,
    getProfile,
    getStatus,
    updateStatusThunk,
    type ProfilePagesType,
    type ProfileType
} from "./profileSlice";
import { profileAPI } from "../api/profile-api";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

vi.mock("../api/profile-api", () => ({
    profileAPI: {
        getProfile: vi.fn(),
        getStatus: vi.fn(),
        updateStatus: vi.fn(),
    }
}))
const mockedProfileAPI = vi.mocked(profileAPI, { deep: true});

const mockAxiosResponse = <T>(data: T): AxiosResponse<T> => ({
    data,
    status: 200,
    statusText: "OK",
    headers: {},
    config: {} as InternalAxiosRequestConfig
})

describe("profileSlice reducers", () => {
    const initialState: ProfilePagesType = {
        postData: [],
        newPostText: "",
        profile: null,
        status: ''
    }

    it("should handle addPost", () => {
        const newState = reducer(initialState, addPost("Hello world"))
        expect(newState.postData).toHaveLength(1)
        expect(newState.postData[0].message).toBe("Hello world")
    })

    it("should handle setUserProfile", () => {
        const mockProfile: ProfileType = {
            aboutMe: "Frontend Dev",
            contacts: {
                facebook: null,
                website: null,
                vk: null,
                twitter: null,
                instagram: null,
                youtube: null,
                github: null,
                mainLink: null
            },
            lookingForAJob: true,
            lookingForAJobDescription: "React developer",
            fullName: "Ksenia",
            userId: 1,
            photos: { small: null, large: null }
        };
        const newState = reducer(initialState, setUserProfile(mockProfile))
        expect(newState.profile).toEqual(mockProfile);
    })

    it("should handle setStatus", () => {
        const newState = reducer(initialState, setStatus("Active"))
        expect(newState.status).toBe("Active")
    })
})

describe("profileSlice async thunks", () => {
    const dispatch = vi.fn();
    const getState = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    })

    it("getProfile dispatches setUserProfile", async () => {
        const mockProfile = { fullName: "Ksenia" };
        mockedProfileAPI.getProfile.mockResolvedValueOnce(mockAxiosResponse(mockProfile))

        await getProfile(1)(dispatch, getState, undefined);

        expect(mockedProfileAPI.getProfile).toHaveBeenCalledWith(1)
        expect(dispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "profile/setUserProfile",
                payload: mockProfile
            })
        )
    })

    it("getStatus dispatches setStatus", async () => {
        mockedProfileAPI.getStatus.mockResolvedValueOnce(mockAxiosResponse("Busy"))

        await getStatus(1)(dispatch, getState, undefined)

        expect(mockedProfileAPI.getStatus).toHaveBeenCalledWith(1)
        expect(dispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "profile/setStatus",
                payload: "Busy"
            })
        )
    })

    it("updateStatusThunk dispatches setStatus when resultCode = 0", async () => {
        mockedProfileAPI.updateStatus.mockResolvedValueOnce(
            mockAxiosResponse({ resultCode: 0, messages: [], data: {}})
        )

        await updateStatusThunk("Happy")(dispatch, getState, undefined)

        expect(mockedProfileAPI.updateStatus).toHaveBeenCalledWith("Happy")
        expect(dispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: "profile/setStatus",
                payload: "Happy"
            })
        )
    })
})














// import reducer, {
//     addPost,
//     setUserProfile,
//     setStatus,
//     getProfile,
//     getStatus,
//     updateStatusThunk,
//     type ProfilePagesType,
//     type ProfileType
// } from "./profileSlice";
// import { profileAPI } from "../api/profile-api";
// import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
//
// // ✅ Правильный способ мокнуть API с Vitest
// vi.mock("../api/profile-api", () => ({
//     profileAPI: {
//         getProfile: vi.fn(),
//         getStatus: vi.fn(),
//         updateStatus: vi.fn(),
//     },
// }));
// const mockedProfileAPI = vi.mocked(profileAPI, { deep: true });
//
// // 🔧 Универсальный хелпер для моков AxiosResponse
// const mockAxiosResponse = <T>(data: T): AxiosResponse<T> => ({
//     data,
//     status: 200,
//     statusText: "OK",
//     headers: {},
//     config: {} as InternalAxiosRequestConfig
// });
//
// describe("profileSlice reducers", () => {
//     const initialState: ProfilePagesType = {
//         postData: [],
//         newPostText: "",
//         profile: null,
//         status: ""
//     };
//
//     it("should handle addPost", () => {
//         const newState = reducer(initialState, addPost("Hello world"));
//         expect(newState.postData).toHaveLength(1);
//         expect(newState.postData[0].message).toBe("Hello world");
//     });
//
//     it("should handle setUserProfile", () => {
//         const mockProfile: ProfileType = {
//             aboutMe: "Frontend Dev",
//             contacts: {
//                 facebook: null,
//                 website: null,
//                 vk: null,
//                 twitter: null,
//                 instagram: null,
//                 youtube: null,
//                 github: null,
//                 mainLink: null
//             },
//             lookingForAJob: true,
//             lookingForAJobDescription: "React developer",
//             fullName: "Ksenia",
//             userId: 1,
//             photos: { small: null, large: null }
//         };
//
//         const newState = reducer(initialState, setUserProfile(mockProfile));
//         expect(newState.profile).toEqual(mockProfile);
//     });
//
//     it("should handle setStatus", () => {
//         const newState = reducer(initialState, setStatus("Active"));
//         expect(newState.status).toBe("Active");
//     });
// });
//
// describe("profileSlice async thunks", () => {
//     const dispatch = vi.fn();
//     const getState = vi.fn();
//
//     beforeEach(() => {
//         vi.clearAllMocks();
//     });
//
//     it("getProfile dispatches setUserProfile", async () => {
//         const mockProfile = { fullName: "Ksenia" };
//         mockedProfileAPI.getProfile.mockResolvedValueOnce(mockAxiosResponse(mockProfile));
//
//         await getProfile(1)(dispatch, getState, undefined);
//
//         expect(mockedProfileAPI.getProfile).toHaveBeenCalledWith(1);
//         expect(dispatch).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 type: "profile/setUserProfile",
//                 payload: mockProfile
//             })
//         );
//     });
//
//     it("getStatus dispatches setStatus", async () => {
//         mockedProfileAPI.getStatus.mockResolvedValueOnce(mockAxiosResponse("Busy"));
//
//         await getStatus(1)(dispatch, getState, undefined);
//
//         expect(mockedProfileAPI.getStatus).toHaveBeenCalledWith(1);
//         expect(dispatch).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 type: "profile/setStatus",
//                 payload: "Busy"
//             })
//         );
//     });
//
//     it("updateStatusThunk dispatches setStatus when resultCode = 0", async () => {
//         mockedProfileAPI.updateStatus.mockResolvedValueOnce(
//             mockAxiosResponse({ resultCode: 0, messages: [], data: {} })
//         );
//
//         await updateStatusThunk("Happy")(dispatch, getState, undefined);
//
//         expect(mockedProfileAPI.updateStatus).toHaveBeenCalledWith("Happy");
//         expect(dispatch).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 type: "profile/setStatus",
//                 payload: "Happy"
//             })
//         );
//     });
// });