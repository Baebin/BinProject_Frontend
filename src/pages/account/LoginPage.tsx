import React, {useState} from 'react';
import {apiManager} from "../../utility/ApiManager";
import {popupManager} from "../../utility/PopupManager";
import {ErrorDto} from "../../model/dto/ErrorDto";
import {useNavigate} from "react-router-dom";
import {accountManager} from "../../utility/AccountManager";

function LoginPage() {
    const [id, setId] = useState<string | null>(null);
    const [pw, setPw] = useState<string | null>(null);

    const navigate = useNavigate();

    const login = () => {
        apiManager.post(
            "account/login",
            {
                "id": id,
                "password": pw,
            },
            (res : any) => {
                accountManager.setIdx(res.data.idx);
                accountManager.setName(res.data.name);
                accountManager.setToken(res.data.token);
                accountManager.setPermission(res.data.permission);

                popupManager.showOkayConfirm(
                    "로그인",
                    "인증되었습니다.",
                    () => {
                        navigate("/");
                        // for Header Refresh
                        window.location.reload();
                    }
                );
            },
            (error : ErrorDto) => {
                popupManager.showBadConfirm(
                    "로그인",
                    error.message,
                    () => {}
                );
            }
        );
    };

    const renderGoogleLoginWidget = () => {
        return (
            <button
                className="flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg"
                     width="800px" height="800px" viewBox="-0.5 0 48 48"
                     version="1.1"><title>Google-color</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Color-" transform="translate(-401.000000, -860.000000)">
                            <g id="Google" transform="translate(401.000000, 860.000000)">
                                <path
                                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                    id="Fill-1" fill="#FBBC05"></path>
                                <path
                                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                    id="Fill-2" fill="#EB4335"></path>
                                <path
                                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                    id="Fill-3" fill="#34A853"></path>
                                <path
                                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                    id="Fill-4" fill="#4285F4"></path>
                            </g>
                        </g>
                    </g>
                </svg>
                <span className="text-xl">Continue with Google</span>
            </button>
        )
    };

    return (
        <div className="place-content-center">
            <div className="flex flex-col items-center gap-y-2 pb-4 mb-8 border-b text-2xl">
                <p>
                    Login With
                </p>
                <a href="http://piebin.kro.kr:8080/login/oauth2/code/google">
                    {
                        renderGoogleLoginWidget()
                    }
                </a>
                <p>
                    Or
                </p>
            </div>
            <form className="flex flex-col gap-y-3 p-4 border-2 border-gray-300 rounded-xl text-base"
                  onSubmit={(e) => {
                      e.preventDefault();
                      login();
                  }}>
                <p className="px-1 text-lg font-semibold">로그인</p>
                <div className="flex flex-col">
                    <label className="p-1">아이디</label>
                    <input className="min-w-80 p-3 border-2 border-gray-200 rounded-2xl" placeholder="Snowbin" required
                           onChange={(e) => {
                               setId(e.target.value);
                           }}/>
                </div>
                <div className="flex flex-col">
                    <label className="p-1">비밀번호</label>
                    <input className="p-3 border-2 border-gray-200 rounded-2xl" placeholder="••••••••" type="password"
                           required
                           onChange={(e) => {
                               setPw(e.target.value);
                           }}/>
                </div>
                <button className="p-2 border-2 rounded-2xl hover:bg-gray-100" type="submit">
                    로그인
                </button>
            </form>
            <button className="flex flex-1 justify-end px-2 py-1 text-gray-400 hover:text-gray-500"
                    onClick={() => navigate("/register")}>
                계정이 없으신가요? 회원가입하기
            </button>
        </div>
    );
}

export default LoginPage;