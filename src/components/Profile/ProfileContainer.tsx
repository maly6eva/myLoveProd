import {Profile} from "./Profile";
import {withAuthRedirect} from "../../hoc/withAuthRedirect.tsx";


export const ProfileContainer = withAuthRedirect(Profile);
