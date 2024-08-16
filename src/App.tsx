import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from "./pages/LandingPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import LoginPage from "./pages/account/LoginPage";
import NotFound from "./components/exception/NotFound";
import RegisterPage from "./pages/account/RegisterPage";
import MyProfile from "./pages/account/MyProfile";
import NoticePage from "./pages/notice/NoticePage";
import NoticeDetailPage from "./pages/notice/NoticeDetailPage";
import NoticeEditPage from "./pages/notice/NoticeEditPage";
import UserProfile from "./pages/account/UserProfile";
import NoticeCreatePage from "./pages/notice/NoticeCreatePage";
import PostPage from "./pages/post/PostPage";
import PostEditPage from "./pages/post/PostEditPage";
import PostDetailPage from "./pages/post/PostDetailPage";
import PostCreatePage from "./pages/post/PostCreatePage";

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 grid justify-center overflow-hidden py-5">
                <Routes>
                    <Route>
                        <Route path="/" element={<LandingPage />}></Route>

                        <Route path="/login" element={<LoginPage />}></Route>
                        <Route path="/register" element={<RegisterPage />}></Route>

                        <Route path="/profile" element={<MyProfile />}></Route>
                        <Route path="/profile/:idx" element={<UserProfile />}></Route>

                        <Route path="/notice" element={<NoticePage />}></Route>
                        <Route path="/notice/:idx" element={<NoticeDetailPage />}></Route>
                        <Route path="/notice/edit/:idx" element={<NoticeEditPage />}></Route>
                        <Route path="/notice/create" element={<NoticeCreatePage />}></Route>

                        <Route path="/post" element={<PostPage />}></Route>
                        <Route path="/post/:idx" element={<PostDetailPage />}></Route>
                        <Route path="/post/edit/:idx" element={<PostEditPage />}></Route>
                        <Route path="/post/create" element={<PostCreatePage />}></Route>

                        <Route path="*" element={<NotFound />}></Route>
                    </Route>
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
