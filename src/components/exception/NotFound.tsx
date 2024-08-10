import React from 'react';

function NotFound() {
    return (
        <div className="flex flex-col items-center">
            <p className="text-9xl font-semibold text-gray-500">
                404
            </p>
            <p className="text-4xl font-semibold text-gray-600 pt-6">
                존재하지 않는 페이지
            </p>
        </div>
    );
}

export default NotFound;