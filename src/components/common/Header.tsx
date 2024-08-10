import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

function Header() {
    const [loginState, setLoginState] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!!token === null)
            setLoginState(true);
    });

    return (
        <div className="flex items-center justify-evenly w-full p-3 bg-blue-400 text-white">
            <Link to="/">
                <img className="w-16 h-16 rounded-full" src="/images/logo.jpg" alt="logo" />
            </Link>
            <div className="flex gap-x-4 text-lg font-semibold">
                <a href="#" className="hover:text-yellow-200">공지사항</a>
                <a href="#" className="hover:text-yellow-200">게시판</a>
                <a href="#" className="hover:text-yellow-200">기타</a>
            </div>
            <div className="text-lg font-semibold hover:text-yellow-200">
                {
                    loginState ?
                        (
                            <div>
                                <a href="#">
                                    로그아웃
                                </a>
                            </div>
                        )
                        : (
                            <div>
                                <a href="/login">
                                    로그인
                                </a>
                            </div>
                        )
                }
            </div>
        </div>
    );
}

export default Header;