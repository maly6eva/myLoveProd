import './App.css'
import {Header} from "./components/Header/Header.jsx";
import {Navbar} from "./components/Navbar/Navbar.jsx";
import {Profile} from "./components/Profile/Profile.jsx";
import {Dialogs} from "./components/Dialogs/Dialogs.jsx";
import {Outlet, Route, Routes} from "react-router-dom";
import {Users} from "./components/Users/Users.tsx";


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


function App() {
    return (
        <Routes>
            <Route path='/' element={< Layout/>}>
                <Route
                    path={"dialogs"}
                    element={<Dialogs/>}/>
                <Route
                    path="dialogs/:id"
                    element={<Dialogs/>}/>
                <Route
                    path="profile"
                    element={<Profile/>}/>
                <Route
                    path="users"
                    element={<Users/>}/>
            </Route>
        </Routes>

    )
}

export default App
