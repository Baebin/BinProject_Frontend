import React from "react";

function LandingPage() {
    return (
        <div className="flex items-center gap-x-10">
            <div className="animate-bounce">
                <img className="w-40 h-fit rounded-full animate-spin" src="/images/bin_bean.png" alt="logo"/>
                <p className="text-sm animate-pulse ml-3">유빈콩</p>
            </div>
            <div className="animate-bounce">
                <p className="text-7xl animate-pulse">Bin Project</p>
            </div>
        </div>
    );
}

export default LandingPage;