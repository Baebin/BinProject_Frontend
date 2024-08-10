import React, {useEffect, useState} from 'react';
import {apiManager} from "../../utility/ApiManager";
import {popupManager} from "../../utility/PopupManager";
import {ErrorDto} from "../../model/dto/ErrorDto";
import {useNavigate} from "react-router-dom";

function MyProfile() {
    const [idx, setIdx] = useState<number | null>(null);
    const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [phone, setPhone] = useState<number | null>(null);
    const [email, setEmail] = useState<number | null>(null);
    const [regDate, setRegDate] = useState<number | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        apiManager.get(
            "account/load/profile",
            null,
            (res : any) => {
                setIdx(res.data.idx);
                setId(res.data.id);
                setName(res.data.name);
                setPhone(res.data.phone);
                setEmail(res.data.email);
                setRegDate(res.data.reg_date);
            },
            (error : ErrorDto) => {
                popupManager.showBadConfirm(
                    "프로필",
                    "로그인이 필요합니다.",
                    () => {
                        navigate("/login");
                    }
                );
            }
        );
    }, []);

    return (
        <div className="flex flex-col items-center p-4 gap-y-2 border-2 border-gray-300 rounded-xl text-xl text-center">
            <img className="w-40 h-40 rounded-full" src="/images/logo.jpg" alt="logo"/>

            <div>
                <p className="text-2xl">
                    {name}님의 프로필
                </p>
                <p className="mb-2 text-gray-600 text-xl">
                    서비스 가입일 | {regDate}
                </p>
            </div>
            <div className="w-full flex bg-white rounded-2xl">
                <p className="w-32 px-6 py-2 bg-neutral-100 rounded-l-2xl">
                    아이디
                </p>
                <p className="grow px-6 bg-neutral-50 py-2 text-left">
                    {id}
                </p>
                <button className="px-6 py-2 bg-neutral-100 rounded-r-2xl">
                    edit
                </button>
            </div>
            <div className="w-full flex bg-white rounded-2xl">
                <p className="w-32 px-6 py-2 bg-neutral-100 rounded-l-2xl">
                    닉네임
                </p>
                <p className="grow px-6 bg-neutral-50 py-2 text-left">
                    {name}
                </p>
                <button className="px-6 py-2 bg-neutral-100 rounded-r-2xl">
                    edit
                </button>
            </div>
            <div className="w-full flex bg-white rounded-2xl">
                <p className="w-32 px-6 py-2 bg-neutral-100 rounded-l-2xl">
                    휴대폰
                </p>
                <p className="grow px-6 bg-neutral-50 py-2 text-left">
                    {phone}
                </p>
                <button className="px-6 py-2 bg-neutral-100 rounded-r-2xl">
                    edit
                </button>
            </div>
            <div className="w-full flex bg-white rounded-2xl">
                <p className="w-32 px-6 py-2 bg-neutral-100 rounded-l-2xl">
                    이메일
                </p>
                <p className="grow px-6 bg-neutral-50 py-2 text-left">
                    {email}
                </p>
                <button className="px-6 py-2 bg-neutral-100 rounded-r-2xl">
                    edit
                </button>
            </div>
        </div>
    );
}

export default MyProfile;