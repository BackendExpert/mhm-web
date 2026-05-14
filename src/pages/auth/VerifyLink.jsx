import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../../services/api";
import DefaultButton from "../../component/Buttons/DefaultButton";
import { useAuth } from "../../context/AuthContext";

let isRequestSent = false;

const VerifyLink = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();

    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState(null);

    const token = searchParams.get("token");

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }

        if (isRequestSent) return;
        isRequestSent = true;

        const fetchVerifyData = async () => {
            try {
                const res = await API.get(
                    `/auth/verify-authlink?token=${token}`
                );

                if (res.data.success) {
                    login(res.data.accessToken);
                    setUser(res.data.user);
                    setVerified(true);
                }
            } catch (err) {
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        fetchVerifyData();
    }, [token, navigate]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center text-lg font-semibold text-indigo-600">
                Verifying...
            </div>
        );
    }

    if (!verified) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">

            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 text-center border border-indigo-100">

                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 text-2xl">✓</span>
                </div>

                <h1 className="text-2xl font-extrabold text-indigo-600 mb-4">
                    Verification Successful
                </h1>

                {user && (
                    <div className="bg-indigo-50 rounded-xl p-4 text-left text-sm text-gray-700 mb-6 space-y-2 border border-indigo-100">
                        <p>
                            <span className="font-semibold text-indigo-600">Email:</span> {user.email}
                        </p>
                        <p>
                            <span className="font-semibold text-indigo-600">Role:</span> {user.role?.role}
                        </p>
                        <p>
                            <span className="font-semibold text-indigo-600">Last Login:</span>{" "}
                            {new Date(user.last_login).toLocaleString()}
                        </p>
                    </div>
                )}

                <DefaultButton
                    onClick={() => navigate("/dashboard")}
                    label="Continue to Dashboard 🚀"
                />

            </div>
        </div>
    );
};

export default VerifyLink;