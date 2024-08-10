import React from 'react';

function Footer() {
    return (
        <div className="flex justify-evenly w-full p-3 px-10 bg-blue-400 text-white">
            <div className="flex flex-col gap-y-1">
                <p className="text-lg font-semibold hover:text-yellow-200">SNS</p>
                <li className="text-base hover:text-yellow-200">
                    <a href="https://blog.naver.com/baebine">Blog</a>
                </li>
                <li className="text-base hover:text-yellow-200">
                    <a href="https://www.instagram.com/bin040505">Instagram</a>
                </li>
            </div>
            <div className="flex flex-col gap-y-1">
                <p className="text-lg font-semibold hover:text-yellow-200">Project</p>
                <li className="text-base hover:text-yellow-200">
                    <a href="https://github.com/Baebin">Github</a>
                </li>
            </div>
        </div>
    );
}

export default Footer;