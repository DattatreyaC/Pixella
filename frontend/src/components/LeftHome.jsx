import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import dp from "../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import OtherUser from "./OtherUser";
import Notifications from "../pages/Notifications";
import { LuLogOut } from "react-icons/lu";
function LeftHome() {
    const { userData, suggestedUsers } = useSelector((state) => state.user);
    const [showNotification, setShowNotification] = useState(false);
    const dispatch = useDispatch();
    const { notificationData } = useSelector((state) => state.user);
    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`, {
                withCredentials: true,
            });
            dispatch(setUserData(null));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <aside
            className={`w-[25%] hidden lg:flex flex-col h-screen bg-gradient-to-b from-gray-950 to-black border-r border-lime-500/20 ${
                showNotification ? "overflow-hidden" : "overflow-y-auto"
            }`}
        >
            <header className="w-full h-24 flex items-center justify-between p-5 border-b border-gray-800 shrink-0">
                <h1 className="bg-gradient-to-r from-lime-400 to-lime-200 text-transparent bg-clip-text font-splash text-5xl">
                    Pixella
                </h1>
                <button
                    className="relative z-50 p-2 rounded-full hover:bg-gray-800 transition-colors"
                    onClick={() => setShowNotification((prev) => !prev)}
                    aria-label="Toggle notifications"
                >
                    <IoNotificationsOutline className="text-lime-400 w-6 h-6" />

                    {notificationData?.some((noti) => !noti.isRead) && (
                        <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full absolute top-1.5 right-1.5 border-2 border-gray-950"></span>
                    )}
                </button>
            </header>

            {showNotification ? (
                <Notifications />
            ) : (
                <div className="w-full flex flex-col">
                    <div className="flex items-center w-full justify-between gap-3 p-5 border-b border-gray-800">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full cursor-pointer overflow-hidden ring-2 ring-offset-2 ring-lime-500/50 ring-offset-black">
                                <img
                                    src={userData.profileImage || dp}
                                    alt={`${userData.userName}'s profile`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-lg text-white font-bold">
                                    {userData.userName}
                                </p>
                                <p className="text-sm text-gray-400 font-medium">
                                    {userData.name}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogOut}
                            className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-800 transition-colors"
                            aria-label="Log out"
                        >
                            <LuLogOut size={22} />
                        </button>
                    </div>

                    <div className="w-full p-5">
                        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                            Suggested For You
                        </h2>
                        <div className="flex flex-col gap-4">
                            {suggestedUsers?.slice(0, 3).map((user) => (
                                <OtherUser key={user.id} user={user} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}

export default LeftHome;
