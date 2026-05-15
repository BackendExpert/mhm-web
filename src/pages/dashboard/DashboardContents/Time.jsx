import React, { useEffect, useState } from "react";
import { FiClock, FiMapPin, FiCalendar, FiGlobe } from "react-icons/fi";

const Time = () => {
    const [data, setData] = useState({
        time: "",
        date: "",
        day: "",
        timezone: "",
    });

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();

            const time = now.toLocaleTimeString("en-LK", {
                timeZone: "Asia/Colombo",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });

            const date = now.toLocaleDateString("en-LK", {
                timeZone: "Asia/Colombo",
                year: "numeric",
                month: "short",
                day: "numeric",
            });

            const day = now.toLocaleDateString("en-LK", {
                timeZone: "Asia/Colombo",
                weekday: "long",
            });

            setData({
                time,
                date,
                day,
                timezone: "GMT +05:30",
            });
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-lg flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
                    <FiClock className="text-xl text-indigo-500" />
                </div>

                <div>
                    <p className="text-[10px] uppercase tracking-[3px] text-gray-500 font-bold">
                        Live Clock
                    </p>
                    <h2 className="text-lg font-bold text-gray-800">Sri Lanka</h2>
                    <h1 className="text-xl font-extrabold text-gray-900">{data.time}</h1>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-center">
                    <FiCalendar className="mx-auto text-indigo-500" />
                    <p className="text-xs text-gray-500 mt-1">Date</p>
                    <p className="text-xs font-bold text-gray-800">{data.date}</p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-center">
                    <FiMapPin className="mx-auto text-violet-500" />
                    <p className="text-xs text-gray-500 mt-1">Day</p>
                    <p className="text-xs font-bold text-gray-800">{data.day}</p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-center">
                    <FiGlobe className="mx-auto text-gray-500" />
                    <p className="text-xs text-gray-500 mt-1">Timezone</p>
                    <p className="text-xs font-bold text-gray-800">GMT +05:30</p>
                </div>
            </div>
        </div>
    );
};

export default Time;