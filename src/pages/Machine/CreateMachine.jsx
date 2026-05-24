import React, { useEffect, useState } from 'react'
import API from '../../services/api'
import useForm from '../../hooks/useForm'
import DefaultInput from '../../component/Form/DefaultInput'
import Dropdown from '../../component/Form/Dropdown'
import DefaultButton from '../../component/Buttons/DefaultButton'
import { IoMdCloseCircleOutline } from "react-icons/io";
import Toast from '../../component/Toast/Toast'

const CreateMachine = () => {
    const [factories, setFactories] = useState([])
    const [productions, setProducations] = useState([])
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false);

    useEffect(() => {
        const fetchfactories = async () => {
            const res = await API.get('factory/factories', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            // console.log(res.data.result)

            if (res.data.success === true) {
                setFactories(res.data.result)
            }
            else {
                console.log(res.data.message)
            }
        }

        if (token) fetchfactories()
    }, [token])

    useEffect(() => {
        const fetchproducations = async () => {
            const res = await API.get('factory/production-lines', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            // console.log(res.data.result)

            if (res.data.success === true) {
                setProducations(res.data.result)
            }
            else {
                console.log(res.data.message)
            }
        }

        if (token) fetchproducations()
    }, [token])


    const { values, handleChange } = useForm({
        name: '',
        type: '',
        model: '',
        serialNumber: '',
        factoryId: '',
        productionLineId: ''
    });

    const headleCreateMachine = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                name: values.name,
                type: values.type,
                model: values.model,
                serialNumber: values.serialNumber,
                factoryId: values.factoryId,
                productionLineId: values.productionLineId,
            }

            const res = await API.post('/machine/create-machine', payload, {
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
                    <div className="">
                        <h1 className="text-lg text-gray-500 font-semibold">Create Machine</h1>
                        <p className="text-gray-500 text-sm">for ProductionLine in Factroy</p>
                    </div>

                    <div className="mt-4">
                        <form onSubmit={headleCreateMachine} method="post">
                            <div className="">
                                <DefaultInput
                                    label={"Enter Machine Name"}
                                    name={'name'}
                                    value={values.name}
                                    required
                                    placeholder={"Machine Name"}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="">
                                <Dropdown
                                    label={"Select Type"}
                                    name="type"
                                    value={values.type}
                                    onChange={handleChange}
                                    options={[
                                        { label: "Industrial Machinery", value: "industrial_machinery" },
                                    ]}
                                />
                            </div>
                            <div className="">
                                <DefaultInput
                                    label={"Enter Machine Model"}
                                    name={'model'}
                                    value={values.model}
                                    required
                                    placeholder={"Machine Model"}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="">
                                <DefaultInput
                                    label={"Enter Machine Serial Number"}
                                    name={'serialNumber'}
                                    value={values.serialNumber}
                                    required
                                    placeholder={"Machine Serial Number"}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="">
                                <Dropdown
                                    label={"Select Factory"}
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
                                <Dropdown
                                    label={"Select Producation Line"}
                                    name="productionLineId"
                                    value={values.productionLineId}
                                    onChange={handleChange}
                                    options={productions
                                        .filter(
                                            (producation) =>
                                                producation.factoryId?._id === values.factoryId
                                        )
                                        .map((producation) => ({
                                            label: producation.name,
                                            value: producation._id,
                                        }))}
                                />
                            </div>

                            <div className="">
                                <DefaultButton
                                    type='submit'
                                    label={loading ? 'Machine Creating...' : 'Create Machine'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="md:mt-0 mt-4 md:w-1/2 bg-white p-4 rounded md:ml-4">
                    <div className="md:w-1/2 bg-white p-4 rounded md:ml-4 md:mt-0 mt-4">
                        <div className="">
                            <h1 className="text-2xl font-semibold text-gray-500 uppercase">
                                important notice
                            </h1>
                        </div>

                        <div className="space-y-3 mt-4">
                            <div className="flex items-center gap-2">
                                <IoMdCloseCircleOutline className="w-6 h-6 text-red-500 flex-shrink-0" />
                                <p className="text-red-500 font-semibold">
                                    A machine cannot be created without selecting a factory and production line.
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <IoMdCloseCircleOutline className="w-6 h-6 text-red-500 flex-shrink-0" />
                                <p className="text-red-500 font-semibold">
                                    Ensure the selected production line belongs to the selected factory.
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <IoMdCloseCircleOutline className="w-6 h-6 text-red-500 flex-shrink-0" />
                                <p className="text-red-500 font-semibold">
                                    Do not create duplicate machines with the same serial number.
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <IoMdCloseCircleOutline className="w-6 h-6 text-red-500 flex-shrink-0" />
                                <p className="text-red-500 font-semibold">
                                    Verify machine model, type, and serial number before submission.
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <IoMdCloseCircleOutline className="w-6 h-6 text-red-500 flex-shrink-0" />
                                <p className="text-red-500 font-semibold">
                                    Machines should only be assigned to active and operational production lines.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateMachine