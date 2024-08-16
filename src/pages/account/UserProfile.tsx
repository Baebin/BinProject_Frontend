import React, {useEffect, useState} from 'react';
import {apiManager} from "../../utility/ApiManager";
import {ErrorDto} from "../../model/dto/ErrorDto";
import {useNavigate, useParams} from "react-router-dom";
import {imageManager, images} from "../../utility/ImageManager";

function UserProfile() {
    const pageName = "프로필";

    const {idx} = useParams();

    const [profile, setProfile] = useState<string>(images.profileNotFound);

    const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [regDate, setRegDate] = useState<number | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        apiManager.get(
            "account/load/profile",
            {
                idx: idx,
            },
            (res : any) => {
                setProfile(
                    imageManager.getProfile(res.data.idx)
                );

                setId(res.data.id);
                setName(res.data.name);
                setRegDate(res.data.reg_date);
            },
            (error : ErrorDto) => {
                if (apiManager.handleException(error, navigate, pageName))
                    return;
            }
        );
    }, []);

    return (
        <div className="place-content-center p-4">
            <div
                className="flex flex-col items-center p-4 gap-y-2 border-2 border-gray-300 rounded-xl text-xl text-center">
                <img className="w-40 h-40 rounded-full cursor-pointer hover:shadow-xl"
                     src={profile}
                     alt="logo"
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
                <div className="w-full flex bg-white rounded-2xl hover:shadow-md">
                    <div className="px-6 py-2 bg-neutral-100 rounded-l-2xl">
                        <p className="w-12">
                            아이디
                        </p>
                    </div>
                    <p className="grow px-6 py-2 break-all bg-neutral-50 rounded-r-2xl text-left">
                        {id}
                    </p>
                </div>
                <div className="w-full flex bg-white rounded-2xl hover:shadow-md">
                    <div className="flex items-center px-6 py-2 bg-neutral-100 rounded-l-2xl">
                        <p className="w-12">
                            닉네임
                        </p>
                    </div>
                    <p className="flex items-center grow px-6 py-1 break-all bg-neutral-50 text-left">
                        {name}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;