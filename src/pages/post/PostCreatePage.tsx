import {useNavigate} from "react-router-dom";
import {imageManager, images} from "../../utility/ImageManager";
import React, {useEffect, useState} from "react";
import {apiManager} from "../../utility/ApiManager";
import {ErrorDto} from "../../model/dto/ErrorDto";
import TextareaAutosize from 'react-textarea-autosize';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {popupManager} from "../../utility/PopupManager";
import {accountManager} from "../../utility/AccountManager";
import {permissionManager} from "../../utility/PermissionManager";

function PostCreatePage() {
    const pageName = "게시글 등록";

    const [title, setTitle] = useState<string | null>(null);
    const [text, setText] = useState<string | null>(null);
    const [authorIdx, setAuthorIdx] = useState<string | null>(null);
    const [authorName, setAuthorName] = useState<string | null>(null);

    const [imgs, setImgs] = useState<any>([]);

    const navigate = useNavigate();

    useEffect(() => {
        setAuthorIdx(accountManager.getIdx());
        setAuthorName(accountManager.getName());

        if (accountManager.isOffline())
            permissionManager.handleForbidden(navigate, pageName);
    }, []);

    const create = () => {
        const files : any[] = [];
        imgs.map((img: any, idx: any) => {
            files.push(img.file);
        });
        if (files.length >= 1) {
            apiManager.postFormData(
                "post/create/multipart",
                files,
                {
                    title: title,
                    text: text,
                },
                () => {
                    popupManager.showOkayConfirm(
                        pageName,
                        "게시물이 등록되었습니다.",
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
        } else {
            apiManager.post(
                "post/create",
                {
                    title: title,
                    text: text,
                },
                () => {
                    popupManager.showOkayConfirm(
                        pageName,
                        "게시물이 등록되었습니다.",
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
        }
    }

    const addImage = (e : any) => {
        e.preventDefault();

        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            console.log(e.target.files[0]);
            setImgs([...imgs, { url: reader.result, file: e.target.files[0] }]);
        }
    }

    const settings = {
        arrows: false,
        dots: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
    };

    return (
        <div className="w-screen max-w-[700px] p-4">
            <div className="border-b pb-2">
                <button className="text-xl hover:opacity-80" onClick={() => navigate("/post")}>
                    [게시판]
                </button>
                <div className="flex justify-between items-center mb-4">
                    <input className="grow mr-4 text-2xl" type="text" value={title ?? ""} placeholder="제목을 입력해주세요."
                           onChange={(e: any) => setTitle(e.target.value)}/>
                    <div className="flex gap-x-1">
                        <button className="border-2 border-gray-200 px-2 rounded-full hover:opacity-80"
                                onClick={() => {
                                    popupManager.showAsk(
                                        pageName,
                                        "게시물을 등록하시겠습니까?",
                                        () => {
                                            create();
                                        },
                                        () => {}
                                    );
                                }}>
                            게시하기
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-x-2 text-lg">
                    <img className="w-8 h-8 rounded-full"
                         src={imageManager.getProfile(authorIdx)}
                         onError={(e: any) => {
                             e.target.src = images.profileNotFound;
                         }}
                    />
                    <p className="text-gray-600">{authorName}</p>
                </div>
            </div>
            <div>
                <TextareaAutosize className="w-full mt-4 whitespace-pre-wrap" defaultValue={text ?? ""} placeholder="내용을 입력해주세요."
                                  onChange={(e: any) => setText(e.target.value)}>
                </TextareaAutosize>
            </div>
            <div className="border-t mt-20 pt-4">
                <Slider {...settings} className="w-60 h-60 mb-5">
                    {
                        imgs.map((img: any, idx: any) =>
                            <div className="relative" key={idx}>
                                <button
                                    className="absolute top-1 right-1 bg-blue-50 border-2 border-black px-2 rounded-full text-red-950 hover:opacity-80"
                                    onClick={() => {
                                        setImgs(imgs.filter((v: any, i: any) => i !== idx));
                                    }}>
                                    삭제
                                </button>
                                <img className="top-0 w-60 h-60" src={img.url}/>
                            </div>
                        )
                    }
                    <div className="w-60 h-60">
                        <label
                            className="w-60 h-60 text-2xl flex justify-center items-center cursor-pointer bg-gray-200">
                            +
                            <input className="hidden"
                                   onClick={(e) => {
                                       if (imgs.length < 5)
                                           return;
                                       e.preventDefault();
                                       popupManager.showBadConfirm(
                                           pageName,
                                           "사진은 최대 5개까지 업로드가 가능합니다.",
                                           () => {
                                           }
                                       );
                                   }}
                                   onChange={(e) => {
                                       addImage(e);
                                   }} accept="image/*, .gif" type="file"/>
                        </label>
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default PostCreatePage;