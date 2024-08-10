import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from "./pages/LandingPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import LoginPage from "./pages/account/LoginPage";
import NotFound from "./components/exception/NotFound";
import RegisterPage from "./pages/account/RegisterPage";

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 grid place-content-center overflow-hidden py-5">
                <Routes>
                    <Route>
                        <Route path="/" element={<LandingPage />}></Route>
                        <Route path="/login" element={<LoginPage />}></Route>
                        <Route path="/register" element={<RegisterPage />}></Route>
                        <Route path="*" element={<NotFound />}></Route>
                    </Route>
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
