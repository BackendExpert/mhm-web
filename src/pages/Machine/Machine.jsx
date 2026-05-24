import React, { useState } from 'react'
import MachineTable from './MachineTable'

const Machine = () => {
    const [activeTab, setActiveTab] = useState('machine-dash')

    return (
        <div className="space-y-6">

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">

                <div className="flex gap-2">

                    <button
                        onClick={() => setActiveTab('machine-dash')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 'machine-dash'
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Machine Dashboard
                    </button>

                    <button
                        onClick={() => setActiveTab('machine-table')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 'machine-table'
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Machine Table
                    </button>

                </div>

            </div>

            <div className="animate-in fade-in duration-300">

                {activeTab === 'machine-dash' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Machine Dashboard
                        </h2>
                    </div>
                )}

                {activeTab === 'machine-table' && (
                    <div className="">
                        <MachineTable />
                    </div>
                )}

            </div>

        </div>
    )
}

export default Machine