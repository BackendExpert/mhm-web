import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm';
import API from '../../services/api';
import Toast from '../../component/Toast/Toast';
import DefaultInput from '../../component/Form/DefaultInput';
import TextAreaInput from '../../component/Form/TextAreaInput';
import FileInput from '../../component/Form/FileInput';
import Dropdown from '../../component/Form/Dropdown';
import DateInput from '../../component/Form/DateInput';
import DefaultButton from '../../component/Buttons/DefaultButton';
import { IoMdCloseCircleOutline } from "react-icons/io";


const FactoryCreate = () => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false);

    const { values, handleChange } = useForm({
        name: '',

        location_id: '',
        location_name: '',
        region: '',
        type: '',
        lat: '',
        lng: '',
        address: '',

        description: '',
        plant_admin: ''
    });

    const token = localStorage.getItem('token')

    const [plantadmins, setPlantAdmins] = useState([])

    useEffect(() => {
        const fetchPlantAdmins = async () => {
            const res = await API.get('factory/plant-admins', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setPlantAdmins(res.data.result)
            }
            else {
                console.log(res.data.message)
            }
        }

        if (token) fetchPlantAdmins()
    }, [token])

    const headleCreateFactory = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                name: values.name,
                location: {
                    location_id: values.location_id,
                    name: values.location_name,
                    region: values.region,
                    type: values.type,
                    lat: values.lat === '' ? null : Number(values.lat),
                    lng: values.lng === '' ? null : Number(values.lng),
                    address: values.address,
                },
                description: values.description,
                plant_admin: values.plant_admin,
            };

            const res = await API.post(
                'factory/create-factory',
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setToast({
                success: true,
                message: res.data.message,
            });
            window.location.reload()

        } catch (err) {
            console.log(err.response);
            console.log(err.response.data);

            setToast({
                success: false,
                message: err.response?.data?.message || 'Something went wrong',
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="mb-4">
                <form onSubmit={headleCreateFactory} method="post">
                    <div className="md:flex justify-between">
                        <div className="md:w-1/2 bg-white p-4 rounded shadow md:mr-2">
                            <div className="">
                                <DefaultInput
                                    label={"Enter Factory Name"}
                                    name={'name'}
                                    value={values.name}
                                    placeholder={"Factory Name"}
                                    required
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="">
                                <TextAreaInput
                                    label={"Enter Factory Description"}
                                    name={'description'}
                                    value={values.description}
                                    required
                                    placeholder='Factory Description'
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="">
                                <Dropdown
                                    label={"Select Plant Admin"}
                                    name="plant_admin"
                                    value={values.plant_admin}
                                    onChange={handleChange}
                                    options={plantadmins.map((admin) => ({
                                        label: admin.email,
                                        value: admin._id,
                                    }))}
                                />
                            </div>

                            <div className="">
                                <TextAreaInput
                                    label={"Enter Factory Address"}
                                    name={'address'}
                                    value={values.address}
                                    required
                                    placeholder='Factory Address'
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="md:mt-0 mt-4 md:w-1/2 bg-white p-4 rounded shadow md:ml-2">
                            <div className="">
                                <h1 className="font-semibold text-gray-500">Location Data</h1>

                                <div className="md:flex justify-between mt-4">
                                    <div className="w-full">
                                        <DefaultInput
                                            label={"Location ID"}
                                            name={'location_id'}
                                            value={values.location_id}
                                            placeholder={"CMB - Colombo, KND - Kandy"}
                                            required
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="w-full md:ml-2">
                                        <DefaultInput
                                            label={"Location"}
                                            name={'location_name'}
                                            value={values.location_name}
                                            placeholder={"Location Name (Ex: Kandy)"}
                                            required
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="md:flex justify-between mt-2">
                                    <div className="w-full">
                                        <DefaultInput
                                            label={"Enter Region"}
                                            name={'region'}
                                            value={values.region}
                                            placeholder={"Central, Wastern"}
                                            required
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="w-full md:ml-2">
                                        <Dropdown
                                            label={"Select Location Type"}
                                            name="type"
                                            value={values.type}
                                            onChange={handleChange}
                                            options={[
                                                { label: "City", value: "city" },
                                                { label: "Town", value: "town" },
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className="md:flex justify-between mt-2">
                                    <div className="w-full">
                                        <DefaultInput
                                            label={"Enter Latitude"}
                                            type='number'
                                            name={'lat'}
                                            value={values.lat}
                                            placeholder={"Latitude"}
                                            required
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="w-full md:ml-2">
                                        <DefaultInput
                                            label={"Enter Longitude"}
                                            type='number'
                                            name={'lng'}
                                            value={values.lng}
                                            placeholder={"Longitude"}
                                            required
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="">
                                    <DefaultButton
                                        type='submit'
                                        label={loading ? 'Creating Factory...' : 'Create Factory'}
                                    />
                                </div>

                                <div className="space-y-3 mt-4">
                                    <div className="flex items-center gap-2">
                                        <IoMdCloseCircleOutline className="w-6 h-6 text-red-500 flex-shrink-0" />
                                        <p className="text-red-500 font-semibold">
                                            Only create factories that physically exist.
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <IoMdCloseCircleOutline className="w-6 h-6 text-red-500 flex-shrink-0" />
                                        <p className="text-red-500 font-semibold">
                                            Do not create duplicate factories that already exist in the system.
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <IoMdCloseCircleOutline className="w-6 h-6 text-red-500 flex-shrink-0" />
                                        <p className="text-red-500 font-semibold">
                                            Ensure the factory location is accurate before submission.
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <IoMdCloseCircleOutline className="w-6 h-6 text-red-500 flex-shrink-0" />
                                        <p className="text-red-500 font-semibold">
                                            Verify all factory details and contact information before creating.
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <IoMdCloseCircleOutline className="w-6 h-6 text-red-500 flex-shrink-0" />
                                        <p className="text-red-500 font-semibold">
                                            Do not use temporary, fake, or placeholder factory information.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default FactoryCreate