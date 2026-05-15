import React from "react";
import {
    HiOutlineBuildingOffice2,
    HiOutlineCpuChip,
    HiOutlineSignal,
} from "react-icons/hi2";

const FactoryCard = () => {

    const factories = [
        {
            id: 1,
            name: "Colombo Factory",
            machines: 124,
            sensors: 842,
            health: "98%",
            status: "Healthy",
        },
        {
            id: 2,
            name: "Kandy Factory",
            machines: 98,
            sensors: 654,
            health: "94%",
            status: "Stable",
        },
        {
            id: 3,
            name: "Galle Factory",
            machines: 76,
            sensors: 512,
            health: "89%",
            status: "Warning",
        },
        {
            id: 4,
            name: "Jaffna Factory",
            machines: 110,
            sensors: 703,
            health: "96%",
            status: "Healthy",
        },
    ];

    return (
        <div className="w-full">

            <h1 className="text-xl font-bold mb-2">Factory Data</h1>

            <div className="grid md:grid-cols-2 gap-5">

                {factories.map((factory) => (

                    <div
                        key={factory.id}
                        className="relative overflow-hidden bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition duration-500"
                    >

                        <div className="absolute -right-5 -bottom-5 opacity-[0.04]">

                            <HiOutlineBuildingOffice2
                                size={150}
                                className="text-indigo-600"
                            />

                        </div>

                        <div className="relative z-10">

                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-lg font-semibold text-gray-900">
                                        {factory.name}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-400">
                                        Health Score
                                    </p>

                                </div>

                                <h2 className="text-3xl font-bold text-indigo-600">
                                    {factory.health}
                                </h2>

                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">

                                <div className="flex items-center gap-3">

                                    <HiOutlineCpuChip
                                        size={18}
                                        className="text-indigo-500"
                                    />

                                    <div>

                                        <p className="text-xs text-gray-400">
                                            Machines
                                        </p>

                                        <p className="font-semibold text-gray-900">
                                            {factory.machines}
                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-center gap-3">

                                    <HiOutlineSignal
                                        size={18}
                                        className="text-green-500"
                                    />

                                    <div>

                                        <p className="text-xs text-gray-400">
                                            Sensors
                                        </p>

                                        <p className="font-semibold text-gray-900">
                                            {factory.sensors}
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="mt-6 flex items-center justify-between">

                                <span className="text-sm font-medium text-gray-400">
                                    Status
                                </span>

                                <span className="text-sm font-semibold text-indigo-600">
                                    {factory.status}
                                </span>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default FactoryCard;