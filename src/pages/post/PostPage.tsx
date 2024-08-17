import React, {useEffect, useState} from "react";
import {imageManager, images} from "../../utility/ImageManager";
import {apiManager} from "../../utility/ApiManager";
import {ErrorDto} from "../../model/dto/ErrorDto";
import {useNavigate} from "react-router-dom";
import {accountManager} from "../../utility/AccountManager";

function PostPage() {
    const [tag, setTag] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [input, setInput] = useState<string | null>(null);
    const [posts, setPosts] = useState<any>([]);

    const navigate = useNavigate();

    const tags = [
        {
            filter: "ALL",
            text: "전체",
        },
        {
            filter: "TITLE",
            text: "제목",
        },
        {
            filter: "TEXT",
            text: "내용",
        }
    ]

    const renderPost = (idx : any, logo: any, title : string, author : string, regDate : string) => {
        return (
            <button
                className="flex flex-col w-60 pt-4 pl-4 pr-4 p-2 border-2 rounded-2xl cursor-pointer hover:shadow-xl"
                key={idx}
                onClick={() => navigate(`/post/${idx}`)}>
                <img className="w-full h-full"
                     src={logo}
                     onError={(e: any) => {
                         e.target.src = images.imageNotFound;
                     }}
                />
                <p className="w-full mt-2 pb-1 border-b truncate text-2xl text-left">
                    {title}
                </p>
                <div className="w-full flex justify-between">
                    <p className="text-sm text-gray-400">
                        {author}
                    </p>
                    <p className="text-sm text-gray-400">
                        {regDate}
                    </p>
                </div>
            </button>
        );
    }

    const renderTagDropdown = () => {
        return (
            <div className="group">
                <button className="text-black hover:text-blue-500 fill-amber-50">
                    {tags[tag].text}
                </button>
                <ul className="fixed block space-y-2 shadow-lg bg-white rounded-lg max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
                    <li className="border-b py-1">
                        <button className="text-gray-600 hover:text-blue-500"
                                onClick={() => setTag(0)}>
                            {tags[0].text}
                        </button>
                    </li>
                    <li className="border-b py-1">
                        <button className="text-gray-600 hover:text-blue-500"
                                onClick={() => setTag(1)}>
                            {tags[1].text}
                        </button>
                    </li>
                    <li className="border-b py-1">
                        <button className="text-gray-600 hover:text-blue-500"
                                onClick={() => setTag(2)}>
                            {tags[2].text}
                        </button>
                    </li>
                </ul>
            </div>
        );
    }

    /*
    for (let i = 0; i < 15; i++) {
        if (i < 10) {
            posts.push(renderPost(
                i,
                images.logo,
                "빈댕이가 빈댕빈댕 빈댕이가 빈댕빈댕",
                "유빈콩",
                "2004.05.05 12:00"
            ));
        } else {
            posts.push(renderPost(
                i,
                images.meunnYa,
                "도르마므냥",
                "유팽달",
                "2003.04.06 12:00"
            ));
        }
    }
    */

    const loadPosts = (p : number) => {
        apiManager.get(
            "post/load/all",
            {
                page: (p - 1),
                count: 15,
                filter: tags[tag].filter,
                data: input,
            },
            (res : any) => {
                console.log(res);

                const models = [];
                for (let idx in res.data) {
                    let dto = res.data[idx];

                    models.push(
                        renderPost(
                            dto.idx,
                            imageManager.getPostThumbnailImage(dto.idx),
                            dto.title,
                            dto.author_name,
                            dto.reg_date
                        )
                    );
                    console.log(res.data[idx]);
                }
                setPosts(models);
                console.log(models);
            },
            (error : ErrorDto) => {}
        );
    }

    useEffect(() => {
        loadPosts(page);
    }, []);

    const search = () => {
        loadPosts(page);
    };

    const movePage = (weight : number) => {
        let p = page;
        p += weight;

        if (p < 1)
            p = 1;
        setPage(p);

        loadPosts(p);
    }

    return (
        <div className="flex flex-col justify-between gap-y-5">
            <div className="sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1200px] flex flex-col gap-y-2">
                <form className="flex border rounded-l-full overflow-hidden"
                      onSubmit={(e) => {
                          e.preventDefault();
                          search();
                      }}>
                    <div className="rounded-l-full p-2 px-8">
                        {renderTagDropdown()}
                    </div>
                    <input className="grow p-2 px-4 bg-blue-50 hover:opacity-80" onChange={(e) => {
                        setInput(e.target.value);
                    }}/>
                    <button className="p-2 px-6 bg-gray-50 hover:bg-gray-100" type="submit">
                        검색
                    </button>
                </form>
                {
                    accountManager.isOnline() &&
                    <div>
                        <div className="flex flex-1 justify-end">
                            <button className="w-fit px-2 py-1 border rounded-full hover:opacity-80"
                                    onClick={() => navigate("/post/create")}>
                                게시물 등록하기
                            </button>
                        </div>
                    </div>
                }
                <div className="w-full flex place-content-center mt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {posts}
                    </div>
                </div>
            </div>
            <div className="flex bottom-10 place-content-center items-center text-xl gap-x-8">
                <button className="hover:text-gray-600" onClick={() => movePage(-1)}>
                    이전
                </button>
                <button className="hover:text-gray-600" onClick={() => movePage(0)}>
                    {page} 페이지
                </button>
                <button className="hover:text-gray-600" onClick={() => movePage(1)}>
                    다음
                </button>
            </div>
        </div>
    );
}

export default PostPage;