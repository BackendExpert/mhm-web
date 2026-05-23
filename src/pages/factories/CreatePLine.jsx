import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm';
import API from '../../services/api';

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
            <div className="md:flex justify-between mb-8">
                <div className="md:w-1/2 bg-white p-4 rounded">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit rerum recusandae odio blanditiis neque expedita. Sint quidem natus exercitationem architecto eligendi cum obcaecati. Excepturi itaque, quaerat enim modi veritatis perspiciatis.
                </div>
                <div className="md:w-1/2 bg-white p-4 rounded md:ml-4 md:mt-0 mt-4">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit rerum recusandae odio blanditiis neque expedita. Sint quidem natus exercitationem architecto eligendi cum obcaecati. Excepturi itaque, quaerat enim modi veritatis perspiciatis.
                </div>
            </div>
        </div>
    )
}

export default CreatePLine