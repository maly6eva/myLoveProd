import { Profile } from "./Profile";
import {withAuthRedirect} from "../../hoc/withAuthRedirect.tsx";


export const DialogsContainer = withAuthRedirect(Profile);