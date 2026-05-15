import React from 'react'
import UserImg from '../../../assets/User.png'
import { useAuth } from '../../../context/AuthContext';

const UserData = () => {
    const { auth } = useAuth();
    return (
        <div className="xl:mt-0 mt-4 relative overflow-hidden rounded-xl border border-indigo-500/20 bg-gradient-to-br from-white via-indigo-50 to-indigo-100 p-6 shadow-[0_20px_60px_rgba(79,70,229,0.15)]">

            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl"></div>

            <div className="relative z-10">

                <div className="flex justify-center">

                    <div className="relative">

                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 blur-xl opacity-40"></div>

                        <div className="relative rounded-full border-4 border-white bg-white p-1 shadow-xl">
                            <img
                                src={UserImg}
                                alt="User"
                                className="h-28 w-28 rounded-full object-cover"
                            />
                        </div>

                        <div className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-2 border-white bg-green-500"></div>

                    </div>

                </div>

                <div className="mt-5 text-center">

                    <h1 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-black text-transparent">
                        {auth?.username}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 break-all">
                        {auth?.email}
                    </p>

                    <div className="mt-5 flex items-center justify-center gap-2">

                        <span className="rounded-full border border-indigo-500/20 bg-indigo-500 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-white shadow-lg shadow-indigo-500/30">
                            {auth?.role}
                        </span>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default UserData