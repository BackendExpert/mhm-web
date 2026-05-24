import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import API from '../../services/api'
import DefaultInput from '../../component/Form/DefaultInput'
import Dropdown from '../../component/Form/Dropdown'
import DefaultButton from '../../component/Buttons/DefaultButton'

const MachineTable = () => {
    const { auth } = useAuth()
    const [machine, setMachine] = useState([])
    const token = localStorage.getItem('token')

    const [search, setSearch] = useState('')
    const [healthStatus, setHealthStatus] = useState('')
    const [minHealth, setMinHealth] = useState('')
    const [maxHealth, setMaxHealth] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const perPage = 10

    useEffect(() => {
        const fetchallmachines = async () => {
            const endpoint =
                auth?.role === 'plant_admin'
                    ? 'machine/fetch-plant-machines'
                    : 'machine/fetch-machines'

            const res = await API.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setMachine(res.data.result)
            } else {
                console.log(res.data.message)
            }
        }

        if (token) fetchallmachines()
    }, [token, auth])

    const filteredMachines = machine.filter((m) => {
        const searchMatch =
            m.model?.toLowerCase().includes(search.toLowerCase()) ||
            m.serialNumber?.toLowerCase().includes(search.toLowerCase())

        const statusMatch =
            healthStatus === '' || m.healthStatus === healthStatus

        const minMatch =
            minHealth === '' || m.healthScore >= Number(minHealth)

        const maxMatch =
            maxHealth === '' || m.healthScore <= Number(maxHealth)

        return searchMatch && statusMatch && minMatch && maxMatch
    })

    const totalPages = Math.ceil(filteredMachines.length / perPage)

    const currentData = filteredMachines.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    )

    return (
        <div className="space-y-4">

            <div className="bg-white p-4 rounded shadow my-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    <DefaultInput
                        label="Search Machine"
                        name="search"
                        value={search}
                        placeholder="Search"
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setCurrentPage(1)
                        }}
                    />

                    <Dropdown
                        label="Health Status"
                        name="healthStatus"
                        value={healthStatus}
                        onChange={(e) => {
                            setHealthStatus(e.target.value)
                            setCurrentPage(1)
                        }}
                        options={[
                            { label: "Good", value: "good" },
                            { label: "Warning", value: "warning" },
                            { label: "Need Action", value: "need_action" }
                        ]}
                    />

                    <DefaultInput
                        label="Min Health"
                        type="number"
                        placeholder="Min - 0"
                        value={minHealth}
                        onChange={(e) => {
                            setMinHealth(e.target.value)
                            setCurrentPage(1)
                        }}
                    />

                    <DefaultInput
                        label="Max Health"
                        type="number"
                        placeholder="Max - 100"
                        value={maxHealth}
                        onChange={(e) => {
                            setMaxHealth(e.target.value)
                            setCurrentPage(1)
                        }}
                    />

                    {
                        auth?.role === 'super_admin' ?
                            <div className="">
                                <div className="">
                                    <a href="/dashboard/Machines/create">
                                        <DefaultButton
                                            type='button'
                                            label='Create New Machine'
                                        />
                                    </a>
                                </div>
                            </div>
                            :
                            <div className=""></div>
                    }



                </div>
            </div>

            <div className="bg-white p-4 rounded shadow">

                <div className="overflow-x-auto">

                    <table className="min-w-full divide-y divide-gray-200">

                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">#</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">Model</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">Type</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">Serial</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">Health</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">Health Status</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase text-gray-500">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {
                                currentData.length > 0 ? (
                                    currentData.map((data, index) => {
                                        return (
                                            <tr key={index} className="hover:bg-gray-50 transition">

                                                <td className="px-6 py-4 text-gray-700 font-medium">
                                                    {(currentPage - 1) * perPage + index + 1}
                                                </td>

                                                <td className="px-6 py-4 text-gray-800">{data.model}</td>
                                                <td className="px-6 py-4 text-gray-600">{data.type}</td>
                                                <td className="px-6 py-4 text-gray-600">{data.serialNumber}</td>

                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${data.status === "active"
                                                        ? "bg-green-100 text-green-700"
                                                        : data.status === "inactive"
                                                            ? "bg-gray-100 text-gray-700"
                                                            : data.status === "maintenance"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-red-100 text-red-700"
                                                        }`}>
                                                        {data.status}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {data.healthScore}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                                                        {data.healthStatus}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-center">
                                                    <a
                                                        href={`machines/${data._id}`}
                                                        className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-indigo-500 hover:text-white transition"
                                                    >
                                                        View
                                                    </a>
                                                </td>

                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                                            No machines found
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">

                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-indigo-200 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-500 hover:text-white disabled:opacity-50"
                >
                    Previous
                </button>

                {
                    [...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`h-10 w-10 rounded-lg text-sm font-semibold ${currentPage === index + 1
                                ? "bg-indigo-500 text-white"
                                : "border border-indigo-200 text-indigo-700"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))
                }

                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="rounded-lg border border-indigo-200 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-500 hover:text-white disabled:opacity-50"
                >
                    Next
                </button>

            </div>

        </div>
    )
}

export default MachineTable