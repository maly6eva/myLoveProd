import './App.css'
import {Navbar} from "./components/Navbar/Navbar.jsx";
import {Outlet, Route, Routes} from "react-router-dom";
import {HeaderContainer} from "./components/Header/HeaderContainer.tsx";
import {Login} from "./components/Header/Login/Login.tsx";
import {UsersContainer} from "./components/Users/UsersContainer.tsx";
import React, {Suspense} from "react";

const DialogsContainer =
    React.lazy(() =>
        import("./components/Dialogs/DialogContainer.tsx").then((module) => ({
            default: module.DialogsContainer,
        }))
    )

const ProfileContainer =
    React.lazy(() =>
        import("./components/Profile/ProfileContainer.tsx").then((module) => ({
            default: module.ProfileContainer,
        })))


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
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <DialogsContainer/>
                        </Suspense>
                    }
                />
                <Route
                    path="dialogs/:id"
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <DialogsContainer/>
                        </Suspense>
                    }
                />

                <Route
                    path="profile"
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <ProfileContainer/>
                        </Suspense>
                    }
                />
                <Route
                    path="profile/:userId"
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <ProfileContainer/>
                        </Suspense>
                    }
                />
                <Route
                    path="users"
                    element={<UsersContainer/>}/>
                <Route path="login" element={<Login/>}/>
            </Route>
        </Routes>

    )
}

export default App
