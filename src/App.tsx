import './App.css'
import {Navbar} from "./components/Navbar/Navbar.jsx";
import {Dialogs} from "./components/Dialogs/Dialogs.jsx";
import {Outlet, Route, Routes} from "react-router-dom";
import {HeaderContainer} from "./components/Header/HeaderContainer.tsx";
import {Login} from "./components/Header/Login/Login.tsx";
import {UsersContainer} from "./components/Users/UsersContainer.tsx";
import {DialogsContainer} from "./components/Dialogs/DialogContainer.tsx";
import {ProfileContainer} from "./components/Profile/ProfileContainer.tsx";




const Layout = () => {
    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Outlet/>
            </div>
        </div>
    )
}


function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route
                    path="dialogs"
                    element={<DialogsContainer/>}/>
                <Route
                    path="dialogs/:id"
                    element={<Dialogs/>}/>
                <Route
                    path="profile"
                    element={<ProfileContainer/>}/>
                <Route
                    path="profile/:userId"
                    element={<ProfileContainer/>}/>
                <Route
                    path="users"
                    element={<UsersContainer/>}/>
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>

    )
}

export default App
