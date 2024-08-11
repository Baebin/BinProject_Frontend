import React from "react";
import {images} from "../../utility/ImageManager";

function NoticePage() {
    const renderPost = (idx : any, title : string, author : string, regDate : string) => {
        return (
            <a href={`/notice/${idx}`} className="flex flex-col w-60 pt-4 pl-4 pr-4 p-2 border-2 rounded-2xl cursor-pointer hover:shadow-xl">
                <img className="w-full h-full"
                     src={images.logo}
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
            </a>
        );
    }

    const models = [];
    for (let i = 0; i < 13; i++)
        models.push(renderPost(
            i,
            "빈댕이가 빈댕빈댕 빈댕이가 빈댕빈댕",
            "유빈콩",
            "2004.05.05 12:00"
        ));

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {models}
        </div>
    );
}

export default NoticePage;