import {useParams} from "react-router-dom";
import {imageManager, images} from "../../utility/ImageManager";
import React, {useEffect, useState} from "react";
import {apiManager} from "../../utility/ApiManager";
import {ErrorDto} from "../../model/dto/ErrorDto";

function NoticeDetailPage() {
    const {idx} = useParams();

    const [title, setTitle] = useState<string | null>(null);
    const [text, setText] = useState<string | null>(null);
    const [authorIdx, setAuthorIdx] = useState<string | null>(null);
    const [authorName, setAuthorName] = useState<string | null>(null);
    const [regDate, setRegDate] = useState<string | null>(null);

    useEffect(() => {
        apiManager.get(
            "notice/load",
            {
                idx: idx,
            },
            (res : any) => {
                let dto = res.data;
                setTitle(dto.title);
                setText(dto.text);
                setAuthorIdx(dto.author_idx);
                setAuthorName(dto.author_name);
                setRegDate(dto.reg_date);

            },
            (error : ErrorDto) => {}
        );
    }, []);

    return (
        <div className="w-screen max-w-[700px] p-4">
            <div className="border-b pb-2">
                <p className="text-xl">
                    [공지]
                </p>
                <p className="text-2xl mb-4">
                    {title}
                </p>
                <div className="flex items-center gap-x-2 text-lg">
                    <img className="w-8 h-8 rounded-full"
                         src={imageManager.getProfile(authorIdx)}
                         onError={(e : any) => {
                             e.target.src = images.profileNotFound;
                         }}
                    />
                    <p className="text-gray-500">{authorName}</p>
                    <p className="text-gray-400">{regDate}</p>
                </div>
            </div>
            <p className="mt-4 whitespace-pre-wrap">
                {text}
            </p>
        </div>
    );
}

export default NoticeDetailPage;