import React, { useState } from "react";

import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
function SignUp() {
    const [inputClicked, setInputClicked] = useState({
        name: false,
        userName: false,
        email: false,
        password: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [err, setErr] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignUp = async () => {
        setLoading(true);
        setErr("");

        try {
            const result = await axios.post(
                `${serverUrl}/api/auth/signup`,
                { name, userName, email, password },
                { withCredentials: true },
            );
            dispatch(setUserData(result.data));
            setLoading(false);
        } catch (error) {
            setErr(error.response?.data?.message);
            console.log(error);
            setLoading(false);
        }
    };

    return (
        // The dark gradient background is ideal for making the glass card stand out.
        <div className="w-full min-h-screen bg-gradient-to-br from-green-950 to-black flex flex-col justify-center items-center sm:p-4">
            {/* --- Glassmorphism Card --- */}
            {/* Key changes:
            - `bg-black/30`: Creates the semi-transparent base.
            - `backdrop-blur-lg`: Adds the essential frosted glass look.
            - `rounded-2xl`: Provides modern, soft corners.
            - `border border-white/10`: A subtle highlight that defines the card's edge.
            - `shadow-xl`: Gives depth and makes the card feel like it's floating.
        */}
            <div className="w-full max-w-lg bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl flex flex-col justify-center items-center px-2 py-4 sm:p-8 text-white">
                {/* --- Header --- */}
                <div className="flex gap-2 items-center text-xl font-semibold mb-6">
                    <span>Sign Up to </span>
                    <h1 className="bg-gradient-to-r from-lime-400 to-lime-200 text-transparent bg-clip-text font-splash text-5xl">
                        Pixella
                    </h1>
                </div>

                {/* --- Form Container --- */}
                {/* The form elements are wrapped in a flex container with a consistent gap for clean spacing. */}
                <div className="w-full flex flex-col gap-4">
                    {/* --- Input Fields --- */}
                    {/* Inputs share a consistent, modern style with a translucent background and a glowing focus ring for better UX. */}
                    <input
                        type="text"
                        id="name"
                        placeholder="Full Name"
                        className="w-full h-12 bg-white/10 rounded-lg px-5 outline-none border border-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-lime-400 transition-all duration-300"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <input
                        type="text"
                        id="userName"
                        placeholder="Username"
                        className="w-full h-12 bg-white/10 rounded-lg px-5 outline-none border border-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-lime-400 transition-all duration-300"
                        required
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                    />
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="w-full h-12 bg-white/10 rounded-lg px-5 outline-none border border-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-lime-400 transition-all duration-300"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    {/* --- Password Input --- */}
                    <div className="relative w-full flex items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Password"
                            className="w-full h-12 bg-white/10 rounded-lg px-5 outline-none border border-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-lime-400 transition-all duration-300"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <div
                            className="absolute right-4 cursor-pointer text-gray-400 hover:text-white transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <IoIosEyeOff size={24} />
                            ) : (
                                <IoIosEye size={24} />
                            )}
                        </div>
                    </div>
                </div>

                {/* --- Error Message --- */}
                {err && <p className="text-red-500 mt-4 text-center">{err}</p>}

                {/* --- Sign Up Button --- */}
                {/* The button uses a vibrant color to signify the primary action, with hover effects for better interactivity. */}
                <button
                    className="w-full h-12 bg-lime-500 hover:bg-lime-600 disabled:bg-lime-800 text-black font-semibold rounded-lg mt-6 transition-all duration-300 flex justify-center items-center hover:scale-105 active:scale-100 shadow-lg shadow-lime-500/20"
                    onClick={handleSignUp}
                    disabled={loading}
                >
                    {loading ? (
                        <ClipLoader size={24} color="black" />
                    ) : (
                        "Sign Up"
                    )}
                </button>

                {/* --- Sign In Link --- */}
                <p
                    className="cursor-pointer text-gray-300 mt-6 text-sm"
                    onClick={() => navigate("/signin")}
                >
                    Already have an account?{" "}
                    <span className="font-semibold text-lime-400 hover:text-lime-300 underline transition-colors">
                        Sign In
                    </span>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
