import {MyPosts} from "./MyPosts/MyPosts.jsx";
import {ProfileInfo} from "./MyPosts/ProfileInfo/ProfileInfo.tsx";




export const Profile = () => {
    return (
        <div>
            <ProfileInfo/>
             <MyPosts/>
                {/*<Button numb='two' size='small' text={'первая кнопка'}/>*/}
                {/*<Button numb='tree' size='large' text={'вторая кнопка'}/>*/}
                {/*<Button/>*/}

        </div>
    );
};

