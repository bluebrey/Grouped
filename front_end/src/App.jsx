import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ManageAccount from "./pages/ManageAccount/ManageAccount";
import Header from "./components/Header/Header";
import Land from "./pages/Land/Land";
import "./index.css";

export default function App() {
    const loc = useLocation();
    const noHeaderPaths = ["/", "/login", "/signup"];
    const isHeaderVisible = !noHeaderPaths.includes(loc.pathname);
    return (
        <div className="flex flex-col h-screen">
            {/* Conditionally render Header component */}
            {isHeaderVisible && <Header />}
            {/* Main Content */}
            <div className="h-full [&>div]:min-h-full">
                <Routes>
                    <Route path='/' element={<Land/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/editprofile" element={<EditProfile/>}/>
                    <Route path="/manageaccount" element={<ManageAccount/>}/>
                </Routes>
            </div>
        </div>
    );
}