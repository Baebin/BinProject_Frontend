import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

function Header() {
    const [loginState, setLoginState] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== null)
            setLoginState(true);
    });

    const logout = () => {
        localStorage.removeItem("idx");
        localStorage.removeItem("token");
        localStorage.removeItem("permission");
        setLoginState(false);
    }

    const renderProfileDropdown = () => {
        return (
            <div className="group">
                <button className="hover:text-yellow-200 hover:fill-yellow-200 fill-white text-white font-semibold text-base block"
                        onClick={() => navigate("/profile")}>
                    프로필
                    <svg width="16px" height="16px" className="ml-1 inline-block" viewBox="0 0 24 24">
                        <path
                            d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                            data-name="16" data-original="#000000"/>
                    </svg>
                </button>
                <ul className="fixed block space-y-2 shadow-lg bg-white rounded-lg max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
                    <li className="border-b py-1">
                        <button className="text-base font-semibold text-gray-600 hover:text-blue-500"
                                onClick={logout}>
                            로그아웃
                        </button>
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-evenly w-full p-3 bg-blue-400 text-white">
            <Link to="/">
                <img className="w-16 h-16 rounded-full" src="/images/logo.jpg" alt="logo"/>
            </Link>
            <div className="flex gap-x-4 text-lg font-semibold">
                <button className="hover:text-yellow-200" onClick={() => navigate("/notice")}>공지사항</button>
                <a href="#" className="hover:text-yellow-200">게시판</a>
                <a href="#" className="hover:text-yellow-200">기타</a>
            </div>

            <div className="text-lg font-semibold">
                {
                    loginState ?
                        (
                            renderProfileDropdown()
                        )
                        : (
                            <button className="hover:text-yellow-200" onClick={() => navigate("/login")}>
                                로그인
                            </button>
                        )
                }
            </div>
        </div>
    );
}

export default Header;