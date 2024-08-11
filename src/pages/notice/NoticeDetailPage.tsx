import {useParams} from "react-router-dom";
import {images} from "../../utility/ImageManager";
import React from "react";

function NoticeDetailPage() {
    const { idx } = useParams();

    return (
        <div className="w-screen max-w-[700px] p-4">
            <div className="border-b pb-2">
                <p className="text-xl">
                    [공지]
                </p>
                <p className="text-2xl mb-4">
                    빈댕이가 빈댕빈댕 빈댕이가 빈댕빈댕
                </p>
                <div className="flex items-center gap-x-2 text-lg">
                    <img className="w-8 h-8 rounded-full"
                         src={images.logo}
                    />
                    <p className="text-gray-500">유빈콩</p>
                    <p className="text-gray-400">2004.05.05 12:00</p>
                </div>
            </div>
            <p className="mt-4 whitespace-pre-wrap">
                문어 쭈꾸미 오징어 꼴뚜기
                문어 쭈꾸미 오징어 꼴뚜기
                문어 쭈꾸미 오징어 꼴뚜기
                문어 쭈꾸미 오징어 꼴뚜기

                문어 쭈꾸미 오징어 꼴뚜기
                문어 쭈꾸미 오징어 꼴뚜기
                문어 쭈꾸미 오징어 꼴뚜기
                문어 쭈꾸미 오징어 꼴뚜기

                문어 쭈꾸미 오징어 꼴뚜기
                문어 쭈꾸미 오징어 꼴뚜기
                문어 쭈꾸미 오징어 꼴뚜기
                문어 쭈꾸미 오징어 꼴뚜기
            </p>
        </div>
    );
}

export default NoticeDetailPage;