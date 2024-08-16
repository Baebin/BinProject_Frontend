import React from "react";
import {images} from "../utility/ImageManager";

function LandingPage() {
    return (
        <div className="flex items-center p-2 gap-x-1">
            <div className="animate-bounce">
                <img className="w-40 h-fit rounded-full animate-spin" src={images.binBean} alt="logo"/>
                <p className="text-sm animate-pulse ml-3">유빈콩</p>
            </div>
            <div className="animate-bounce">
                <img className="w-40 h-fit rounded-full animate-spin" src={images.meunnYa} alt="logo"/>
                <p className="text-sm animate-pulse ml-3">먕</p>
            </div>
            <div className="animate-bounce">
                <p className="text-7xl animate-pulse">Bin Project</p>
            </div>
        </div>
    );
}

export default LandingPage;