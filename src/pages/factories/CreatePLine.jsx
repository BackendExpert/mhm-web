import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm';
import API from '../../services/api';
import DefaultInput from '../../component/Form/DefaultInput';
import Dropdown from '../../component/Form/Dropdown';
import DefaultButton from '../../component/Buttons/DefaultButton';
import { IoMdCloseCircleOutline } from "react-icons/io";
import Toast from '../../component/Toast/Toast';

const CreatePLine = () => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false);
    const token = localStorage.getItem('token')

    const { values, handleChange } = useForm({
        name: '',
        max_machines: '',
        factoryId: '',
    });

    const [factories, setFactories] = useState([])

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


    const createPLine = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                name: values.name,
                max_machines: values.max_machines === '' ? null : Number(values.max_machines),
                factoryId: values.factoryId
            }
            const res = await API.post('factory/create-producation-line', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            setToast({
                success: true,
                message: res.data.message,
            });
            window.location.reload()
        }
        catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || 'Something went wrong',
            });
        }
        finally {
            setLoading(false)
        }
    }
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

            <div className="md:flex justify-between mb-8">
                <div className="md:w-1/2 bg-white p-4 rounded">
                    <div className="mb-8">
                        <h1 className="text-gray-500 font-semibold">Create Producation Line</h1>
                        <p className="text-xs text-gray-500">in Factory</p>
                    </div>
                    <form onSubmit={createPLine} method="post">
                        <div className="">
                            <DefaultInput
                                label={"Enter Production Line Name"}
                                name={'name'}
                                value={values.name}
                                placeholder={"Production Line Name"}
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="">
                            <DefaultInput
                                label={"Enter Count Max Machines"}
                                type='number'
                                name={'max_machines'}
                                value={values.max_machines}
                                placeholder={"Max Machines"}
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="">
                            <Dropdown
                                label={"Select Plant Admin"}
                                name="factoryId"
                                value={values.factoryId}
                                onChange={handleChange}
                                options={factories.map((factory) => ({
                                    label: factory.name,
                                    value: factory._id,
                                }))}
                            />
                        </div>

                        <div className="">
                            <DefaultButton
                                type='submit'
                                label={loading ? 'Processing...' : 'Create Producation Line'}
                            />
                        </div>
                    </form>
                </div>
                <div className="md:w-1/2 bg-white p-4 rounded md:ml-4 md:mt-0 mt-4">
                    <div className="">
                        <h1 className="text-2xl font-semibold text-gray-500 uppercase">important notice</h1>
                    </div>
                    <div className="space-y-3 mt-4">
                        <div className="flex items-center gap-2">
                            <IoMdCloseCircleOutline className="w-6 h-6 text-red-500 flex-shrink-0" />
                            <p className="text-red-500 font-semibold">
                                A production line cannot be created without selecting a factory.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <IoMdCloseCircleOutline className="w-6 h-6 text-red-500 flex-shrink-0" />
                            <p className="text-red-500 font-semibold">
                                Ensure the selected factory physically exists and is operational.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <IoMdCloseCircleOutline className="w-6 h-6 text-red-500 flex-shrink-0" />
                            <p className="text-red-500 font-semibold">
                                Do not create duplicate production lines for the same manufacturing process.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <IoMdCloseCircleOutline className="w-6 h-6 text-red-500 flex-shrink-0" />
                            <p className="text-red-500 font-semibold">
                                Verify production line details before submitting the configuration.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <IoMdCloseCircleOutline className="w-6 h-6 text-red-500 flex-shrink-0" />
                            <p className="text-red-500 font-semibold">
                                Production lines should only be created for approved manufacturing operations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePLine