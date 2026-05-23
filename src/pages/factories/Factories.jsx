import React, { useEffect, useState } from 'react'
import API from '../../services/api'
import MapView from './MapView'

const Factories = () => {
    const [factories, setFactories] = useState([])
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchfactories = async () => {
            const res = await API.get('factory/factories', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(res.data.result)

            if (res.data.success === true) {
                setFactories(res.data.result)
            }
            else {
                console.log(res.data.message)
            }
        }

        if (token) fetchfactories()
    }, [token])


    return (
        <div>
            <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8 mb-8">
                {
                    factories.map((data, index) => {
                        return (
                            <div
                                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
                                key={index}
                            >
                                <MapView
                                    lat={data?.location?.lat}
                                    lng={data?.location?.lng}
                                />

                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                {data?.name}
                                            </h2>

                                            <p className="text-gray-500 mt-1">
                                                {data?.location?.name}, {data?.location?.region}
                                            </p>
                                        </div>

                                        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold">
                                            {data?.location?.location_id}
                                        </span>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                        <p className="text-sm text-gray-500 mb-1">
                                            Factory Address
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {data?.location?.address}
                                        </p>
                                    </div>

                                    <p className="text-gray-600 leading-relaxed mb-5">
                                        {data?.description}
                                    </p>

                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                                            <p className="text-xs text-gray-500 uppercase">
                                                Type
                                            </p>
                                            <p className="font-semibold text-gray-800 mt-1">
                                                {data?.location?.type}
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                                            <p className="text-xs text-gray-500 uppercase">
                                                Latitude
                                            </p>
                                            <p className="font-semibold text-gray-800 mt-1">
                                                {data?.location?.lat}
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                                            <p className="text-xs text-gray-500 uppercase">
                                                Longitude
                                            </p>
                                            <p className="font-semibold text-gray-800 mt-1">
                                                {data?.location?.lng}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Factories