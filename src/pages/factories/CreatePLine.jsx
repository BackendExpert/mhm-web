import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm';
import API from '../../services/api';

const CreatePLine = () => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false);

    const { values, handleChange } = useForm({
        name: '',
        max_machines: '',
        factoryId: '',
    });

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
        <div>CreatePLine</div>
    )
}

export default CreatePLine