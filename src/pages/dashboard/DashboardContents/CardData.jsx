import React from "react";
import {
    Cpu,
    Factory,
    Users,
    TrendingUp,
} from "lucide-react";

const CardDate = () => {

    const carddata = [
        {
            id: 1,
            name: "Total Machines",
            value: "50",
            growth: "+12%",
            icon: Cpu,
        },
        {
            id: 2,
            name: "Total Factories",
            value: "12",
            growth: "+8%",
            icon: Factory,
        },
        {
            id: 3,
            name: "Active Users",
            value: "28",
            growth: "+5%",
            icon: Users,
        },
    ];

    return (
        <div className="w-full">

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                {carddata.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.id}
                            className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm hover:shadow-lg transition duration-500"
                        >

                            <div className="absolute -right-5 -bottom-5 opacity-[0.05]">

                                <Icon
                                    size={140}
                                    strokeWidth={1}
                                    className="text-indigo-800"
                                />

                            </div>

                            <div className="relative z-10">

                                <p className="text-sm font-medium text-gray-400">
                                    {item.name}
                                </p>

                                <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
                                    {item.value}
                                </h2>

                                <div className="mt-6 flex items-center gap-2">

                                    <TrendingUp
                                        size={15}
                                        className="text-green-500"
                                    />

                                    <span className="text-sm font-semibold text-green-500">
                                        {item.growth}
                                    </span>

                                    <span className="text-xs text-gray-400">
                                        from last month
                                    </span>

                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>
    );
};

export default CardDate;