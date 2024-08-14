import React, {useEffect, useState} from "react";
import {imageManager, images} from "../../utility/ImageManager";
import {apiManager} from "../../utility/ApiManager";
import {ErrorDto} from "../../model/dto/ErrorDto";
import {useNavigate} from "react-router-dom";

function NoticePage() {
    const [posts, setPosts] = useState<any>([]);

    const navigate = useNavigate();

    const renderPost = (idx : any, logo: any, title : string, author : string, regDate : string) => {
        return (
            <button className="flex flex-col w-60 pt-4 pl-4 pr-4 p-2 border-2 rounded-2xl cursor-pointer hover:shadow-xl" key={idx}
                    onClick={() => navigate(`/notice/${idx}`)}>
                <img className="w-full h-full"
                     src={logo}
                     onError={(e : any) => {
                         e.target.src = images.imageNotFound;
                     }}
                />
                <p className="text-2xl mt-2 pb-1 border-b truncate">
                    {title}
                </p>
                <div className="flex justify-between">
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

    /*
    for (let i = 0; i < 15; i++) {
        if (i < 10) {
            models.push(renderPost(
                i,
                images.logo,
                "빈댕이가 빈댕빈댕 빈댕이가 빈댕빈댕",
                "유빈콩",
                "2004.05.05 12:00"
            ));
        } else {
            models.push(renderPost(
                i,
                images.meunnYa,
                "도르마므냥",
                "유팽달",
                "2003.04.06 12:00"
            ));
        }
    }
    */

    useEffect(() => {
        apiManager.get(
            "notice/load/all",
            {
            },
            (res : any) => {
                console.log(res);

                const models = [];
                for (let idx in res.data) {
                    let dto = res.data[idx];

                    models.push(
                        renderPost(
                            dto.idx,
                            imageManager.getNoticeThumbnailImage(dto.idx),
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
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {posts}
        </div>
    );
}

export default NoticePage;