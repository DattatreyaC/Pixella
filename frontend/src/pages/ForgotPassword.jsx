import axios from "axios";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../App";

function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [inputClicked, setInputClicked] = useState({
        email: false,
        otp: false,
        newPassword: false,
        confirmNewPassword: false,
    });
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [err, setErr] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleStep1 = async () => {
        setLoading(true);
        setErr("");
        try {
            const result = await axios.post(
                `${serverUrl}/api/auth/sendOtp`,
                { email },
                { withCredentials: true },
            );
            console.log(result.data);
            setStep(2);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setErr(error.response.data.message);
        }
    };
    const handleStep2 = async () => {
        setLoading(true);
        setErr("");
        try {
            const result = await axios.post(
                `${serverUrl}/api/auth/verifyOtp`,
                { email, otp },
                { withCredentials: true },
            );
            console.log(result.data);
            setLoading(false);
            setStep(3);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setErr(error.response.data.message);
        }
    };
    const handleStep3 = async () => {
        if (newPassword !== confirmNewPassword) {
            return setErr("Passwords Do not match");
        }
        setErr("");
        setLoading(true);
        try {
            const result = await axios.post(
                `${serverUrl}/api/auth/resetPassword`,
                { email, password: newPassword },
                { withCredentials: true },
            );
            console.log(result.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setErr(error.response.data.message);
        }
    };

    return (
        <div className="w-full min-h-screen p-4 flex flex-col justify-center items-center bg-gradient-to-br from-green-950 to-black">
            <div
                className="w-full max-w-md bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl
                        flex flex-col items-center p-8 text-white relative z-10"
            >
                <h2 className="text-3xl font-semibold mb-2">
                    {step === 3 ? "Reset Password" : "Forgot Password"}
                </h2>
                <p className="text-gray-300 text-sm text-center mb-8">
                    {step === 1 &&
                        "We'll send a verification code to your email."}
                    {step === 2 && `Enter the 6-digit code sent to your email.`}
                    {step === 3 && "Create a new, secure password."}
                </p>

                {step === 1 && (
                    <form
                        onSubmit={handleStep1}
                        className="w-full flex flex-col items-center"
                    >
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full h-12 bg-white/10 rounded-lg px-5 mb-6 outline-none border border-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-lime-500 transition-all"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-lime-500 hover:bg-lime-600 disabled:bg-lime-800 text-black font-semibold rounded-lg transition-all hover:scale-105 active:scale-100 flex justify-center items-center shadow-lg shadow-lime-500/20"
                        >
                            {loading ? (
                                <ClipLoader size={24} color="black" />
                            ) : (
                                "Send Code"
                            )}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form
                        onSubmit={handleStep2}
                        className="w-full flex flex-col items-center"
                    >
                        <input
                            type="text"
                            id="otp"
                            placeholder="Enter OTP"
                            className="w-full h-12 bg-white/10 rounded-lg px-5 mb-6 outline-none border border-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-lime-500 transition-all"
                            required
                            onChange={(e) => setOtp(e.target.value)}
                            value={otp}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-lime-500 hover:bg-lime-600 disabled:bg-lime-800 text-black font-semibold rounded-lg transition-all hover:scale-105 active:scale-100 flex justify-center items-center shadow-lg shadow-lime-500/20"
                        >
                            {loading ? (
                                <ClipLoader size={24} color="black" />
                            ) : (
                                "Verify Code"
                            )}
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <form
                        onSubmit={handleStep3}
                        className="w-full flex flex-col items-center gap-4"
                    >
                        <div className="relative w-full flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="newPassword"
                                placeholder="New Password"
                                className="w-full h-12 bg-white/10 rounded-lg px-5 outline-none border border-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-lime-500 transition-all"
                                required
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                            />
                            <div
                                className="absolute right-4 cursor-pointer text-gray-400 hover:text-white"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <IoIosEyeOff size={24} />
                                ) : (
                                    <IoIosEye size={24} />
                                )}
                            </div>
                        </div>
                        <div className="relative w-full flex items-center">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmNewPassword"
                                placeholder="Confirm New Password"
                                className="w-full h-12 bg-white/10 rounded-lg px-5 outline-none border border-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-lime-500 transition-all"
                                required
                                onChange={(e) =>
                                    setConfirmNewPassword(e.target.value)
                                }
                                value={confirmNewPassword}
                            />
                            <div
                                className="absolute right-4 cursor-pointer text-gray-400 hover:text-white"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? (
                                    <IoIosEyeOff size={24} />
                                ) : (
                                    <IoIosEye size={24} />
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 mt-2 bg-lime-500 hover:bg-lime-600 disabled:bg-lime-800 text-black font-semibold rounded-lg transition-all hover:scale-105 active:scale-100 flex justify-center items-center shadow-lg shadow-lime-500/20"
                        >
                            {loading ? (
                                <ClipLoader size={24} color="black" />
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>
                )}

                {err && <p className="text-red-500 mt-4 text-center">{err}</p>}
            </div>
        </div>
    );
}

export default ForgotPassword;
