import React, { useState } from 'react'
import API from '../../services/api'
import DefaultButton from '../../component/Buttons/DefaultButton'
import DefaultInput from '../../component/Form/DefaultInput'
import useForm from '../../hooks/useForm'
import Toast from '../../component/Toast/Toast'
import { FaDotCircle, FaFingerprint } from 'react-icons/fa'
import LoginImg from '../../assets/LoginImg.png'

const RequestLink = () => {
    const { values, handleChange } = useForm({ email: '' });
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false);

    const handleRequestLink = async (e) => {
        e.preventDefault()

        if (!values.email) {
            setToast({ success: false, message: "Email is required" });
            return
        }

        setLoading(true)

        try {
            const res = await API.post('/auth/request-authlink', {
                email: values.email
            })

            // alert(res.data.message)
            setToast({ success: true, message: res.data.message });
        } catch (err) {
            console.log(err)
            const message = err.response?.data?.error?.message || 'Something went wrong';
            setToast({ success: false, message });
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className=" bg-white relative overflow-hidden">
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #e0e7ff 1px, transparent 1px),
                        linear-gradient(to bottom, #e0e7ff 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto min-h-screen flex items-center px-6">

                <div className="w-full flex flex-col flex-row items-center gap-12">

                    <div className="w-full lg:w-1/2 md:flex hidden flex-col justify-center items-start text-left">

                        <p className="bg-indigo-100 text-indigo-700 px-3 py-1 text-xs font-semibold rounded-md">
                            HIGH SECURITY AUTHENTICATION
                        </p>

                        <h1 className="mt-4 text-3xl font-bold text-gray-900">
                            Machine Health Monitoring System
                        </h1>

                        <p className="mt-3 text-gray-600">
                            A real-time intelligent monitoring platform designed to track machine performance,
                            detect anomalies early, and ensure maximum operational uptime using smart analytics
                            and secure authentication layers.
                        </p>

                        <div className="mt-6 space-y-3">
                            <div className="flex gap-2">
                                <FaDotCircle className="mt-1 text-indigo-500" />
                                <span>Real-time machine health tracking</span>
                            </div>

                            <div className="flex gap-2">
                                <FaDotCircle className="mt-1 text-indigo-500" />
                                <span>AI-based anomaly detection system</span>
                            </div>

                            <div className="flex gap-2">
                                <FaDotCircle className="mt-1 text-indigo-500" />
                                <span>Secure authentication & role-based access</span>
                            </div>
                        </div>

                    </div>

                    <div className="md:mx-16 relative bg-white rounded-2xl shadow-lg overflow-hidden">

                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700" />

                        <div className="p-8">

                            <div className="flex items-start justify-between gap-6">

                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-[3px]">
                                        Welcome Back
                                    </p>

                                    <h1 className="text-xl font-bold text-gray-800 leading-snug">
                                        Sign in to your account
                                    </h1>

                                    <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                                        Access your dashboard and continue managing your workflow securely and efficiently.
                                    </p>
                                </div>

                                <div className="bg-indigo-100 p-4 rounded-2xl flex items-center justify-center">
                                    <FaFingerprint size={40} className="text-indigo-600" />
                                </div>

                            </div>

                            <div className="flex justify-center items-center mt-10">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-indigo-200/40 blur-3xl rounded-full" />

                                    <img
                                        src={LoginImg}
                                        alt="login"
                                        className="relative h-20 w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>

                            <div className="mt-10">
                                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                                    Enter your email address and receive a secure authentication link.
                                </p>

                                <form method="post" onSubmit={handleRequestLink} className="space-y-5">

                                    <DefaultInput
                                        name="email"
                                        type="email"
                                        placeholder="username@example.com"
                                        onChange={handleChange}
                                        value={values.email}
                                    />

                                    <DefaultButton
                                        type='submit'
                                        label={loading ? 'Sending...' : 'Request Link'}
                                    />

                                </form>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="mb-8 text-gray-500 text-xs ">
                                Developed and Maintained by <a className='text-indigo-500' href="https://www.blackalphalabs.com/" target='_blank'>blackalphalabs</a>
                            </p>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default RequestLink