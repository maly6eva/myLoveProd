import './App.css'
import {Header} from "./components/Header/Header.jsx";
import {Navbar} from "./components/Navbar/Navbar.jsx";
import {Profile} from "./components/Profile/Profile.jsx";
import {Dialogs} from "./components/Dialogs/Dialogs.jsx";
import { Outlet, Route, Routes} from "react-router-dom";
import {type ActionType, type StateTypeProps} from "./redux/state.ts";



type AppProps = {
    state: StateTypeProps,
    dispatch: (action: ActionType) => void
}

const Layout = () => {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Outlet/>
            </div>
        </div>
    )
}


function App({state, dispatch}: AppProps) {
    return (

        <Routes>
            <Route path='/' element={< Layout />}>
                <Route path={"dialogs"}>
                    <Route index element={<Dialogs dialogsPages={state.dialogsPages} dispatch={dispatch}/>}/>
                    <Route path=":id" element={<Dialogs dialogsPages={state.dialogsPages} dispatch={dispatch}/>}/>
                </Route>
                <Route path="/profile" element={<Profile profilePages={state.profilePages}  dispatch={dispatch}/>}/>
            </Route>
        </Routes>

    )
}

export default App
