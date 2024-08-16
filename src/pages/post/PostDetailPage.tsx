import {useNavigate, useParams} from "react-router-dom";
import {imageManager, images} from "../../utility/ImageManager";
import React, {useEffect, useState} from "react";
import {apiManager} from "../../utility/ApiManager";
import {ErrorDto} from "../../model/dto/ErrorDto";
import Slider from "react-slick";
import {accountManager} from "../../utility/AccountManager";
import {popupManager} from "../../utility/PopupManager";

function PostDetailPage() {
    const pageName = "게시글";

    const {idx} = useParams();

    const [title, setTitle] = useState<string | null>(null);
    const [text, setText] = useState<string | null>(null);
    const [authorIdx, setAuthorIdx] = useState<string | null>(null);
    const [authorName, setAuthorName] = useState<string | null>(null);
    const [regDate, setRegDate] = useState<string | null>(null);

    const [files, setFiles] = useState<number | null>(null);
    const [imgUrls, setImgUrls] = useState<string[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        apiManager.get(
            "post/load",
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

                setFiles(dto.files);

                const urls : string[] = [];
                for (let i = 0; i < dto.files; i++)
                    urls.push(imageManager.getPostImage(dto.idx, i));
                setImgUrls(urls);
            },
            (error : ErrorDto) => {}
        );
    }, []);

    const del = () => {
        popupManager.showAsk(
            pageName,
            "게시물을 삭제하시겠습니까?",
            () => {
                apiManager.delete(
                    "post/delete",
                    {
                        idx: idx,
                    },
                    () => {
                        popupManager.showOkayConfirm(
                            pageName,
                            "게시물이 삭제되었습니다.",
                            () => {
                                navigate(`/post`);
                            }
                        );
                    },
                    (error : ErrorDto) => {
                        if (apiManager.handleException(error, navigate, pageName))
                            return;
                        popupManager.showBadConfirm(
                            pageName,
                            error.message,
                            () => {}
                        );
                    },
                );
            },
            () => {}
        );
    }

    const settings = {
        arrows: false,
        dots: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        variableWidth: true,
    };

    return (
        <div className="w-screen max-w-[700px] p-4">
            <div className="border-b pb-2">
                <button className="text-xl hover:opacity-80" onClick={() => navigate("/post")}>
                    [공지]
                </button>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-2xl">
                        {title}
                    </p>
                    {
                        accountManager.isAdmin() &&
                        <div className="flex gap-x-1">
                            <button className="bg-blue-50 hover:bg-blue-100 border-2 border-gray-200 px-2 rounded-full"
                                    onClick={() => navigate(`/post/edit/${idx}`)}>
                                수정
                            </button>
                            <button className="bg-red-50 hover:bg-red-100 border-2 border-gray-200 px-2 rounded-full"
                                    onClick={() => del()}>
                                삭제
                            </button>
                        </div>
                    }
                </div>
                <div className="flex items-center gap-x-2 text-lg">
                    <button className="flex items-center gap-x-2 hover:opacity-80"
                            onClick={() => navigate(`/profile/${authorIdx}`)}>
                        <img className="w-8 h-8 rounded-full"
                             src={imageManager.getProfile(authorIdx)}
                             onError={(e: any) => {
                                 e.target.src = images.profileNotFound;
                             }}
                        />
                        <p className="text-gray-500">{authorName}</p>
                    </button>
                    <p className="text-gray-400">{regDate}</p>
                </div>
            </div>
            <div>
                <p className="mt-4 whitespace-pre-wrap">
                    {text}
                </p>
            </div>
            {
                imgUrls.length > 0 &&
                <div className="border-t mt-20 pt-4">
                    <Slider {...settings} className="w-60 h-60 mt-4 mb-5">
                        {
                            imgUrls.map((url: any, idx: any) =>
                                <div key={idx}>
                                    <img className="top-0 w-60 h-60" src={url}/>
                                </div>
                            )
                        }
                    </Slider>
                </div>
            }
        </div>
    );
}

export default PostDetailPage;