import {MyPosts} from "./MyPosts/MyPosts.jsx";
import {ProfileInfo} from "./MyPosts/ProfileInfo/ProfileInfo.tsx";
import {type ActionType, type ProfilePagesType} from "../../redux/state.ts";


export type ProfilePropsType = {
    profilePages: ProfilePagesType
    dispatch: (action: ActionType) => void
}

export const Profile = ({profilePages, dispatch}: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo/>
             <MyPosts profilePages={profilePages}   dispatch={dispatch}/>
                {/*<Button numb='two' size='small' text={'первая кнопка'}/>*/}
                {/*<Button numb='tree' size='large' text={'вторая кнопка'}/>*/}
                {/*<Button/>*/}

        </div>
    );
};

