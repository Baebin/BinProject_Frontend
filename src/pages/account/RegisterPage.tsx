import React, {useState} from 'react';
import {apiManager} from "../../utility/ApiManager";
import {popupManager} from "../../utility/PopupManager";
import {ErrorDto} from "../../model/dto/ErrorDto";
import {useNavigate} from "react-router-dom";

function RegisterPage() {
    const [id, setId] = useState<string | null>(null);
    const [pw, setPw] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    const navigate = useNavigate();

    const register = () => {
        apiManager.post(
            "account/register",
            {
                "id": id,
                "password": pw,
                "name": name,
                "phone": phone,
                "email": email
            },
            (res : any) => {
                popupManager.showOkayConfirm(
                    "회원가입",
                    "계정이 생성되었습니다.",
                    () => {
                        navigate("/login");
                    }
                );
            },
            (error : ErrorDto) => {
                popupManager.showBadConfirm(
                    "회원가입",
                    error.message,
                    () => {}
                );
            }
        );
    };

    return (
        <div>
            <form className="flex flex-col p-4 gap-y-1 border-2 border-gray-300 rounded-xl text-base"
                  onSubmit={(e) => {
                      e.preventDefault();
                      register();
                  }}>
                <p className="px-1 text-lg font-semibold">회원가입</p>
                <p className="p-1 border-b text-neutral-500">* 필수 입력 사항</p>
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <label className="p-1">닉네임</label>
                        <input className="min-w-80 p-3 border-2 border-gray-200 rounded-2xl"
                               placeholder="유빈콩"
                               required
                               onChange={(e) => {
                                   setName(e.target.value);
                               }}/>
                    </div>
                    <div className="flex flex-col">
                        <label className="p-1">아이디</label>
                        <input className="min-w-80 p-3 border-2 border-gray-200 rounded-2xl"
                               placeholder="Snowbin"
                               required
                               onChange={(e) => {
                                   setId(e.target.value);
                               }}/>
                    </div>
                    <div className="flex flex-col">
                        <label className="p-1">비밀번호</label>
                        <input className="p-3 border-2 border-gray-200 rounded-2xl"
                               placeholder="••••••••"
                               type="password"
                               required
                               onChange={(e) => {
                                   setPw(e.target.value);
                               }}/>
                    </div>
                </div>
                <p className="p-1 mt- border-b text-neutral-500">* 선택 입력 사항</p>
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <label className="p-1">전화번호</label>
                        <input className="min-w-80 p-3 border-2 border-gray-200 rounded-2xl"
                               placeholder="01020040505"
                               type="number"
                               onChange={(e) => {
                                   setPhone(e.target.value);
                               }}/>
                    </div>
                    <div className="flex flex-col">
                        <label className="p-1">이메일</label>
                        <input className="min-w-80 p-3 border-2 border-gray-200 rounded-2xl"
                               placeholder="piebin@naver.com"
                               onChange={(e) => {
                                   setEmail(e.target.value);
                               }}/>
                    </div>
                </div>
                <button className="p-2 mt-3 border-2 rounded-2xl hover:bg-gray-100" type="submit">
                    회원가입
                </button>
            </form>
            <a href="/login" className="flex flex-1 justify-end px-2 py-1 text-gray-400 hover:text-gray-500">계정이 이미
                있으신가요? 로그인하기</a>
        </div>
    );
}

export default RegisterPage;