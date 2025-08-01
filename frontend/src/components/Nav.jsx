import React from "react";
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { RxVideo } from "react-icons/rx";
import { FiPlusSquare } from "react-icons/fi";
import dp from "../assets/dp.webp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Nav() {
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.user);
    return (
        <div className="w-[100%] lg:w-[50%] h-[80px] bg-lime-500/95 [backdrop-filter:blur(10px)] flex justify-around items-center fixed bottom-[0px] shadow-2xl shadow-[#000000] z-[100] border-t-2 border-black">
            <div onClick={() => navigate("/")}>
                <GoHomeFill className="text-black hover:text-black/70 cursor-pointer w-[25px] h-[25px]" />
            </div>
            <div onClick={() => navigate("/search")}>
                <FiSearch className="text-black hover:text-black/70 cursor-pointer w-[25px] h-[25px]" />
            </div>
            <div onClick={() => navigate("/upload")}>
                <FiPlusSquare className="text-black hover:text-black/70 cursor-pointer w-[25px] h-[25px]" />
            </div>
            <div onClick={() => navigate("/loops")}>
                <RxVideo className="text-black hover:text-black/70 cursor-pointer w-[28px] h-[28px]" />
            </div>
            <div
                className="w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
                onClick={() => navigate(`/profile/${userData.userName}`)}
            >
                <img
                    src={userData.profileImage || dp}
                    alt=""
                    className="w-full object-cover"
                />
            </div>
        </div>
    );
}

export default Nav;
