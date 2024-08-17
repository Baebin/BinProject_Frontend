import {useNavigate, useParams} from "react-router-dom";
import {imageManager, images} from "../../utility/ImageManager";
import React, {useEffect, useState} from "react";
import {apiManager} from "../../utility/ApiManager";
import {ErrorDto} from "../../model/dto/ErrorDto";
import Slider from "react-slick";
import {accountManager} from "../../utility/AccountManager";
import {popupManager} from "../../utility/PopupManager";
import TextareaAutosize from "react-textarea-autosize";

function PostDetailPage() {
    const pageName = "게시글";

    // Dto
    const {idx} = useParams();

    const [title, setTitle] = useState<string | null>(null);
    const [text, setText] = useState<string | null>(null);
    const [authorIdx, setAuthorIdx] = useState<string | null>(null);
    const [authorName, setAuthorName] = useState<string | null>(null);
    const [regDate, setRegDate] = useState<string | null>(null);

    const [files, setFiles] = useState<number | null>(null);
    const [viewCount, setViewCount] = useState<number | null>(null);

    const [comments, setComments] = useState<any[]>([]);

    const [likeCount, setLikeCount] = useState<number>(0);
    const [likeState, setLikeState] = useState<boolean>(false);

    const [commentCount, setCommentCount] = useState<number>(0);

    const [imgUrls, setImgUrls] = useState<string[]>([]);

    // Etc
    const [commentVisibility, setCommentVisibility] = useState<boolean>(false);

    const [commentWritingValue, setCommentWritingValue] = useState<string | null>(null);
    const [subCommentWritingValue, setSubCommentWritingValue] = useState<string | null>(null);
    const [subCommentWritingFocusIdx, setSubCommentWritingFocusIdx] = useState<number | null>(null);

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
                setViewCount(dto.view_count);
                setCommentCount(dto.comment_count);

                setLikeCount(dto.like_count);
                setLikeState(dto.like_state);

                setCommentCount(dto.comment_count);

                const urls : string[] = [];
                for (let i = 0; i < dto.files; i++)
                    urls.push(imageManager.getPostImage(dto.idx, i));
                setImgUrls(urls);
            },
            (error : ErrorDto) => {}
        );

        refreshComments();
    }, []);

    const deletePost = () => {
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

    const refreshComments = () => {
        apiManager.get(
            "post/comment/load/all",
            {
                idx: idx,
            },
            (res : any) => {
                let dto = res.data;
                setComments(dto);
            },
            (error : ErrorDto) => {}
        );
    }

    const writeComment = (parentIdx : number | null, comment : string) => {
        apiManager.post(
            "post/comment/create",
            {
                post_idx: idx,
                parent_comment_idx: parentIdx,
                comment: comment,
            },
            (res : any) => {
                refreshComments();
            },
            (error : ErrorDto) => {}
        );
    }

    const deleteComment = (commentIdx: number) => {
        apiManager.delete(
            "post/comment/delete",
            {
                idx: commentIdx,
            },
            (res : any) => {
                refreshComments();
            },
            (error : ErrorDto) => {}
        );
    }

    const renderCommentWriting = (isMain : boolean) => {
        return (
            <form className="flex flex-col p-4 gap-y-2 border-2 bg-white">
                <div className="flex items-center gap-x-2">
                    <img className="w-8 h-8 rounded-full"
                         src={imageManager.getProfile(authorIdx)}
                         onError={(e: any) => {
                             e.target.src = images.profileNotFound;
                         }}
                    />
                    <p className="text-gray-600">{authorName}</p>
                </div>
                <TextareaAutosize placeholder="댓글을 입력해주세요."
                                  value={isMain ? (commentWritingValue ?? "") : (subCommentWritingValue ?? "")}
                                  required
                                  onChange={(e: any) => {
                                      if (isMain)
                                          setCommentWritingValue(e.target.value)
                                      else setSubCommentWritingValue(e.target.value)
                                  }}/>
                <div className="flex flex-1 justify-end">
                    <button className="border px-2 py-1 hover:bg-gray-100" type="submit"
                            onClick={(e : any) => {
                                e.preventDefault();

                                if (isMain && commentWritingValue != null) {
                                    writeComment(null, commentWritingValue);
                                    setCommentWritingValue(null);
                                }
                                else if (!isMain && subCommentWritingFocusIdx != null && subCommentWritingValue != null) {
                                    writeComment(subCommentWritingFocusIdx, subCommentWritingValue);
                                    setSubCommentWritingValue(null);
                                    setSubCommentWritingFocusIdx(null);
                                }
                            }}>
                        등록하기
                    </button>
                </div>
            </form>
        );
    }

    const renderChild = (widget : any) => {
        return (
            <div className="flex border-b p-2 bg-gray-100">
                <p className="mt-4 sm:ml-1 md:ml-2 lg:ml-3 xl:ml-4 2xl:ml-5">
                    ┕
                </p>
                <div className="w-full ml-2 sm:ml-3 md:ml-4 lg:ml-5">
                    {widget}
                </div>
            </div>
        )
    };

    const renderComment = (dto: any, isParent: boolean) => {
        const widget = (
            <div>
                <div className="flex">
                    <div className="flex items-center gap-x-2 text-lg">
                        <button className="flex items-center gap-x-2 hover:opacity-80"
                                onClick={() => navigate(`/profile/${dto.author_idx}`)}>
                            <img className="w-8 h-8 rounded-full"
                                 src={imageManager.getProfile(dto.author_idx)}
                                 onError={(e: any) => {
                                     e.target.src = images.profileNotFound;
                                 }}
                            />
                            <p className="text-gray-600">{dto.author_name}</p>
                        </button>
                    </div>
                    {
                        (dto.state === "ENABLED" && accountManager.equalsWithIdx(authorIdx)) &&
                        <div className="flex flex-1 justify-end">
                            <button onClick={() => {
                                deleteComment(dto.idx);
                            }}>
                                {
                                    isParent ?
                                        <p className="border px-2 py-1 hover:bg-gray-100">
                                            삭제
                                        </p>
                                        : <p className="border px-2 py-1 hover:bg-gray-200">
                                            삭제
                                        </p>
                                }
                            </button>
                        </div>
                    }
                </div>
                {
                    dto.state === "ENABLED" ?
                        <p className="text-gray-700">{dto.comment}</p>
                        : <p className="text-gray-500">{"삭제된 댓글입니다."}</p>
                }
                <p className="text-sm text-gray-400">{dto.reg_date}</p>
                <button className="text-sm border px-2 py-1 hover:bg-gray-100 mt-2"
                        onClick={() => {
                            if (subCommentWritingFocusIdx === dto.idx)
                                setSubCommentWritingFocusIdx(null);
                            else setSubCommentWritingFocusIdx(dto.idx);
                        }}>
                    답글
                </button>
            </div>
        );
        if (isParent)
            return (
                <div className="border-b p-2 bg-gray-50">
                    {widget}
                </div>
            );
        return renderChild(widget);
    }

    const renderComments = (data: any[]) => {
        return (
            <div className="p-1 sm:p-2 ml:p-3 lg:p-4 bg-gray-50">
                {
                    data.map((dtos: any[]) =>
                        <div className="border-t">
                            {
                                dtos.map((dto: any, idx: number) =>
                                    <div>
                                        {
                                            renderComment(dto, idx === 0)
                                        }
                                        {
                                            subCommentWritingFocusIdx === dto.idx &&
                                            renderChild(renderCommentWriting(false))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    )
                }
                <div className="mt-4">
                    {
                        renderCommentWriting(true)
                    }
                </div>
            </div>
        );
    }

    const toggleLike = () => {
        apiManager.put(
            "post/comment/edit/like",
            {
                idx: idx,
                like: !likeState
            },
            () => {
                setLikeCount(likeCount + (likeState ? -1 : 1));
                setLikeState(!likeState);
            },
            (error : ErrorDto) => {
                popupManager.showBadConfirm(
                    pageName,
                    error.message,
                    () => {}
                );
            },
        );
    }
    const toggleComment = () => {
        setCommentVisibility(!commentVisibility);
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
                    [게시판]
                </button>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-2xl text-gray-700">
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
                                    onClick={() => deletePost()}>
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
                        <p className="text-gray-600">{authorName}</p>
                    </button>
                    <p className="text-gray-400">{regDate}</p>
                    <p className="flex flex-1 justify-end text-gray-400">조회수: {viewCount}</p>
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
            <div className="flex gap-x-2 pt-8">
                <button className="flex gap-x-2 border px-2 py-1 hover:bg-gray-100"
                        onClick={() => toggleLike()}>
                    <p className="text-red-500">
                        { likeState ? "♥" : "♡" }
                    </p>
                    <p>
                        |
                    </p>
                    <p>
                        공감 {likeCount}
                    </p>
                </button>
                <button className="flex gap-x-2 border px-2 py-1 hover:bg-gray-100"
                        onClick={() => toggleComment()}>
                    <p>
                        ＠
                    </p>
                    <p>
                        |
                    </p>
                    <p>
                        댓글 {commentCount}
                    </p>
                    <p className="border-l pl-2">
                        { commentVisibility ? "▲" : "▼" }
                    </p>
                </button>
            </div>
            <div className="pt-2">
                {
                    commentVisibility &&
                    renderComments(comments)
                }
            </div>
        </div>
    );
}

export default PostDetailPage;