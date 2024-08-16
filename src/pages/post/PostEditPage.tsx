import {useNavigate, useParams} from "react-router-dom";
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

function PostEditPage() {
    const pageName = "게시글 수정";

    const {idx} = useParams();

    const [title, setTitle] = useState<string | null>(null);
    const [text, setText] = useState<string | null>(null);
    const [authorIdx, setAuthorIdx] = useState<string | null>(null);
    const [authorName, setAuthorName] = useState<string | null>(null);
    const [regDate, setRegDate] = useState<string | null>(null);

    const [imgs, setImgs] = useState<any>([]);

    const navigate = useNavigate();

    useEffect(() => {
        apiManager.get(
            "post/load",
            {
                idx: idx,
            },
            async (res : any) => {
                let dto = res.data;
                setTitle(dto.title);
                setText(dto.text);
                setAuthorIdx(dto.author_idx);
                setAuthorName(dto.author_name);
                setRegDate(dto.reg_date);

                if (!accountManager.equalsWithIdx(dto.author_idx))
                    permissionManager.handleForbidden(navigate, pageName);

                const imgs : any[] = [];
                for (let i = 0; i < dto.files; i++) {
                    let url = imageManager.getPostImage(dto.idx, i);
                    const response = await fetch(url);
                    const data = await response.blob();
                    imgs.push(
                        {
                            url: url,
                            file: new File([data], `${i}`, { type: `image/png` }),
                        }
                    );
                }
                setImgs(imgs);
            },
            (error : ErrorDto) => {}
        );
    }, []);

    const edit = () => {
        apiManager.put(
            "post/edit",
            {
                idx: idx,

                title: title,
                text: text,
            },
            (res : any) => {
                const files : any[] = [];
                imgs.map((img: any, idx: any) => {
                    files.push(img.file);
                });
                if (files.length >= 1) {
                    apiManager.putFormData(
                        "post/edit/image/all",
                        files,
                        {
                            idx: idx,
                        },
                        () => {},
                        () => {},
                    );
                } else {
                    apiManager.delete(
                        "post/delete/image/all",
                        {
                            idx: idx,
                        },
                        () => {},
                        () => {},
                    );
                }
                popupManager.showOkayConfirm(
                    pageName,
                    "게시물이 수정되었습니다.",
                    () => {
                        navigate(`/post/${idx}`);
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
                    [게시글]
                </button>
                <div className="flex justify-between items-center mb-4">
                    <input className="grow mr-4 text-2xl" type="text" value={title ?? ""}
                           onChange={(e: any) => setTitle(e.target.value)}/>
                    <div className="flex gap-x-1">
                        <button className="border-2 border-gray-200 px-2 rounded-full hover:opacity-80"
                                onClick={() => {
                                    popupManager.showAsk(
                                        pageName,
                                        "수정 사항을 반영하시겠습니까?",
                                        () => {
                                            edit();
                                        },
                                        () => {}
                                    );
                                }}>
                            수정 완료
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
                    <p className="text-gray-500">{authorName}</p>
                    <p className="text-gray-400">{regDate}</p>
                </div>
            </div>
            <div>
                <TextareaAutosize className="w-full mt-4 whitespace-pre-wrap" defaultValue={text ?? ""}
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

export default PostEditPage;