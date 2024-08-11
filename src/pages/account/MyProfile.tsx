import React, {useEffect, useState} from 'react';
import {apiManager} from "../../utility/ApiManager";
import {popupManager} from "../../utility/PopupManager";
import {ErrorDto} from "../../model/dto/ErrorDto";
import {useNavigate} from "react-router-dom";
import {imageManager, images} from "../../utility/ImageManager";

function MyProfile() {
    const pageName = "프로필";

    const [profile, setProfile] = useState<string>(images.profileNotFound);

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
                setProfile(
                    imageManager.getProfile(res.data.idx)
                );

                setIdx(res.data.idx);
                setId(res.data.id);
                setName(res.data.name);
                setPhone(res.data.phone);
                setEmail(res.data.email);
                setRegDate(res.data.reg_date);
            },
            (error : ErrorDto) => {
                if (apiManager.handleForbidden(error, navigate, pageName))
                    return;
            }
        );
    }, []);

    const editImage = () => {
        popupManager.showMoreInput(
            pageName,
            "닉네임 수정",
            "file",
            name,
            "닉네임을 입력해주세요.",
            (value: any) => {
                apiManager.putFormData(
                    "account/edit/profile/image",
                    value,
                    null,
                    (res: any) => {
                        setProfile(
                            imageManager.getProfile(idx)
                        );
                    },
                    (error: ErrorDto) => {
                        if (apiManager.handleForbidden(error, navigate, pageName))
                            return;
                    }
                );
            },
            (value: any) => {
                apiManager.delete(
                    "account/delete/profile/image",
                    null,
                    (res: any) => {
                        setProfile(
                            images.profileNotFound
                        );
                    },
                    (error: ErrorDto) => {
                        if (apiManager.handleForbidden(error, navigate, pageName))
                            return;
                    }
                );
            },
            () => {
            },
        );
    }
    const editName = () => {
        popupManager.showInput(
            pageName,
            "닉네임 수정",
            "text",
            name,
            "닉네임을 입력해주세요.",
            (value: any) => {
                apiManager.put(
                    "account/edit/name",
                    {
                        name: value,
                    },
                    (res: any) => {
                        setName(value);
                    },
                    (error: ErrorDto) => {
                        if (apiManager.handleForbidden(error, navigate, pageName))
                            return;
                    }
                );
            },
            () => {
            },
        );
    }
    const editPhone = () => {
        popupManager.showInput(
            pageName,
            "전화번호 수정",
            "text",
            phone,
            "전화번호를 입력해주세요.",
            (value: any) => {
                apiManager.put(
                    "account/edit/phone",
                    {
                        phone: value,
                    },
                    (res: any) => {
                        setPhone(value);
                    },
                    (error: ErrorDto) => {
                        if (apiManager.handleForbidden(error, navigate, pageName))
                            return;
                    }
                );
            },
            () => {
            },
        );
    }
    const editEmail = () => {
        popupManager.showInput(
            pageName,
            "이메일 수정",
            "text",
            email,
            "이메일을입력해주세요.",
            (value: any) => {
                apiManager.put(
                    "account/edit/email",
                    {
                        email: value,
                    },
                    (res: any) => {
                        setEmail(value);
                    },
                    (error: ErrorDto) => {
                        if (apiManager.handleForbidden(error, navigate, pageName))
                            return;
                    }
                );
            },
            () => {
            },
        );
    }

    return (
        <div className="p-2">
            <div
                className="flex flex-col items-center p-4 gap-y-2 border-2 border-gray-300 rounded-xl text-xl text-center">
                <img className="w-40 h-40 rounded-full cursor-pointer hover:opacity-80"
                     src={profile}
                     alt="logo" onClick={editImage}
                     onError={(e) => {
                         setProfile(images.profileNotFound);
                     }}
                />
                <div>
                    <p className="text-2xl">
                        {name}님의 프로필
                    </p>
                    <p className="mb-2 text-gray-600 text-xl">
                        서비스 가입일 | {regDate}
                    </p>
                </div>
                <div className="w-full flex bg-white rounded-2xl">
                    <p className="w-24 px-6 py-2 bg-neutral-100 rounded-l-2xl">
                        아이디
                    </p>
                    <p className="grow px-6 py-2 break-all bg-neutral-50 rounded-r-2xl text-left">
                        {id}
                    </p>
                </div>
                <div className="w-full flex bg-white rounded-2xl">
                    <p className="w-24 px-6 py-2 bg-neutral-100 rounded-l-2xl">
                        닉네임
                    </p>
                    <p className="grow px-6 py-2 break-all bg-neutral-50 text-left">
                        {name}
                    </p>
                    <button className="min-w-fit px-3 py-2 bg-neutral-100 rounded-r-2xl" onClick={editName}>
                        edit
                    </button>
                </div>
                <div className="w-full flex bg-white rounded-2xl">
                    <p className="w-24 px-6 py-2 bg-neutral-100 rounded-l-2xl">
                        휴대폰
                    </p>
                    <p className="grow px-6 py-2 break-all bg-neutral-50 text-left">
                        {phone}
                    </p>
                    <button className="min-w-fit px-3 py-2 bg-neutral-100 rounded-r-2xl" onClick={editPhone}>
                        edit
                    </button>
                </div>
                <div className="w-full flex bg-white rounded-2xl">
                    <p className="w-24 px-6 py-2 bg-neutral-100 rounded-l-2xl">
                        이메일
                    </p>
                    <p className="grow px-6 py-1 break-all bg-neutral-50 text-left">
                        {email}
                    </p>
                    <button className="min-w-fit px-3 py-2 bg-neutral-100 rounded-r-2xl" onClick={editEmail}>
                        edit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;