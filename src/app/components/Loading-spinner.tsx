import React from 'react';


const LoadingSpinner: React.FC = () => {
    return (
        <div className='bg-gray-100 h-[230vh]'>
            <div className="flex flex-col justify-center items-center max-w-screen-2xl mx-auto h-screen bg-gray-100">
                <div className="relative">
                    {/* Outer Ring */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                    {/* Spinning Ring */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    {/* Pulse Circle */}
                    <div className="w-16 h-16 bg-blue-500 rounded-full opacity-50 animate-ping"></div>
                </div>
                <p className="mt-9 text-[45px] text-gray-700 font-semibold">Loading, please wait...</p>
            </div></div>
    );
};


export default LoadingSpinner;


