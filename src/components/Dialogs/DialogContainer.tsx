import { Dialogs } from "./Dialogs";
import {withAuthRedirect} from "../../hoc/withAuthRedirect.tsx";


export const DialogsContainer = withAuthRedirect(Dialogs);