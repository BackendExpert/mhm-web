import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm';
import API from '../../services/api';
import Toast from '../../component/Toast/Toast';
import DefaultInput from '../../component/Form/DefaultInput';
import TextAreaInput from '../../component/Form/TextAreaInput';
import FileInput from '../../component/Form/FileInput';
import Dropdown from '../../component/Form/Dropdown';
import DateInput from '../../component/Form/DateInput';

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

            if(res.data.success === true) {
                setPlantAdmins(res.data.result)
            }
            else{
                console.log(res.data.message)
            }
        }

        if(token) fetchPlantAdmins()
    }, [token])

    const headleCreateFactory = async (e) => {
        e.preventDefault()
        setLoading(true)

        const payload = {
            name: values.name,

            location: {
                location_id: values.location_id,
                name: values.location_name,
                region: values.region,
                type: values.type,
                lat: Number(values.lat),
                lng: Number(values.lng),
                address: values.address,
            },

            description: values.description,
            plant_admin: values.plant_admin,
        };

        try {
            const res = await API.post('factory/create-factory', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setToast({ success: true, message: res.data.message });
            }
            else {
                setToast({ success: false, message: res.data.message });
            }
        }
        catch (err) {
            console.log(err)
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

            <div className="mb-4">
                <form action="" method="post">
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
                        </div>
                        <div className="md:mt-0 mt-4 md:w-1/2 bg-white p-4 rounded shadow md:ml-2">
                            {
                                plantadmins.map((data, index) => {
                                    return (
                                        <div className="" key={index}>
                                            {data.email}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default FactoryCreate