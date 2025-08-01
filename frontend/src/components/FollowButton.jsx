import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setFollowing, toggleFollow } from "../redux/userSlice";

function FollowButton({ targetUserId, onFollowChange }) {
    const { following } = useSelector((state) => state.user);
    const isFollowing = following.includes(targetUserId);
    const dispatch = useDispatch();
    const handleFollow = async () => {
        try {
            const result = await axios.get(
                `${serverUrl}/api/user/follow/${targetUserId}`,
                { withCredentials: true },
            );
            if (onFollowChange) {
                onFollowChange();
            }
            dispatch(toggleFollow(targetUserId));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <button
            className={`px-[5px] w-[90px] py-[3px] h-[35px]  text-[15px] rounded-sm  border-2  text-white cursor-pointer  transition-colors duration-200 ${
                isFollowing
                    ? "bg-gray-700 border-white/50 hover:bg-white/30"
                    : "bg-lime-700/50 border-lime-400 hover:bg-lime-700/80"
            }`}
            onClick={handleFollow}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
}

export default FollowButton;
