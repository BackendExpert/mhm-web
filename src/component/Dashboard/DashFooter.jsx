import React from "react";
import {
    HiOutlineCpuChip,
    HiOutlineSignal,
} from "react-icons/hi2";

const DashFooter = () => {
    return (
        <footer className="w-full px-8 py-6">

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                <div className="text-center md:text-left">

                    <p className="text-sm text-gray-400 font-medium">

                        © {new Date().getFullYear()} MHMS Enterprise

                        <span className="mx-2 text-gray-300">
                            —
                        </span>

                        Developed by

                        <a
                            href="https://www.blackalphalabs.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="ml-2 text-indigo-600 hover:text-indigo-500 transition"
                        >
                            BlackAlphaLabs PVT.Ltd
                        </a>

                    </p>

                </div>

                <div className="flex items-center gap-5">

                    <div className="flex items-center gap-2">

                        <HiOutlineSignal
                            size={16}
                            className="text-green-500"
                        />

                        <span className="text-xs font-medium tracking-wide text-gray-400">
                            SYSTEM ONLINE
                        </span>

                    </div>

                    <div className="flex items-center gap-2">

                        <HiOutlineCpuChip
                            size={16}
                            className="text-indigo-500"
                        />

                        <span className="text-xs font-medium tracking-wide text-gray-400">
                            VERSION 1.0.0
                        </span>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default DashFooter;