import React, {useState} from 'react';
import {apiManager} from "../../utility/ApiManager";
import {popupManager} from "../../utility/PopupManager";
import {ErrorDto} from "../../model/dto/ErrorDto";
import {useNavigate} from "react-router-dom";

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
                localStorage.setItem("token", res.data.token);
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

    return (
        <div>
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
                           }} />
                </div>
                <div className="flex flex-col">
                    <label className="p-1">비밀번호</label>
                    <input className="p-3 border-2 border-gray-200 rounded-2xl" placeholder="••••••••" type="password" required
                           onChange={(e) => {
                               setPw(e.target.value);
                           }} />
                </div>
                <button className="p-2 border-2 rounded-2xl hover:bg-gray-100" type="submit">
                    로그인
                </button>
            </form>
            <button className="flex flex-1 justify-end px-2 py-1 text-gray-400 hover:text-gray-500" onClick={() => navigate("/register")}>
                계정이 없으신가요? 회원가입하기
            </button>
        </div>
    );
}

export default LoginPage;