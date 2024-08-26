import React from "react";

export default function Alert({ message }) {
    return (
        <div>
            <div
                className="bg-red-100 text-red-800  p-4 rounded-lg relative"
                role="alert"
            >
                <strong className="font-bold text-sm">Error!</strong>
                <span className="block text-sm sm:inline max-sm:mt-2 max-sm:ml-0 ml-4 mr-8">
                    {message}
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 hover:bg-red-200 rounded-lg transition-all p-2 cursor-pointer fill-red-500 absolute right-4 top-1/2 -translate-y-1/2"
                    viewBox="0 0 320.591 320.591"
                >
                </svg>
            </div>
        </div>
    );
}
