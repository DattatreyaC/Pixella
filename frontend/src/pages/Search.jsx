import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "../redux/userSlice";
import dp from "../assets/dp.webp";
function Search() {
    const navigate = useNavigate();
    const [input, setInput] = useState(null);
    const [searchData, setSearchData] = useState();
    const dispatch = useDispatch();
    const handleSearch = async () => {
        try {
            const result = await axios.get(
                `${serverUrl}/api/user/search?keyWord=${input}`,
                { withCredentials: true },
            );
            setSearchData(result.data);
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (input) {
            handleSearch();
        }
    }, [input]);
    console.log(searchData);
    return (
        <div className="w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px] ">
            <div className="w-full h-[80px]  flex items-center gap-[20px] px-[20px] absolute top-0 ">
                <MdOutlineKeyboardBackspace
                    className="text-white cursor-pointer w-[25px]  h-[25px] "
                    onClick={() => navigate(`/`)}
                />
            </div>
            <div className="w-full h-[80px] flex items-center justify-center mt-[80px]">
                <div className="w-[90%] max-w-[800px] h-[80%] rounded-full bg-[#1a2018] flex items-center px-[20px]">
                    <FiSearch className="w-[18px] h-[18px] text-lime-400" />
                    <input
                        type="text"
                        placeholder="search..."
                        className="w-full h-full outline-0 rounded-full px-[20px] text-white text-[18px]"
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                </div>
            </div>
            {input &&
                searchData?.map((user) => (
                    <div
                        className="w-[90vw] max-w-[700px] h-[60px] rounded-sm bg-lime-400 flex items-center gap-[20px] px-[5px] cursor-pointer hover:bg-lime-400/90 transition-colors duration-200"
                        onClick={() => navigate(`/profile/${user.userName}`)}
                    >
                        <div className="w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                            <img
                                src={user.profileImage || dp}
                                alt=""
                                className="w-full object-cover"
                            />
                        </div>

                        <div className="text-black text-[14px] font-semibold">
                            <p className="text-[18px] text-black">
                                {user.name}
                            </p>
                            <h2 className="font-normal">@{user.userName}</h2>
                        </div>
                    </div>
                ))}

            {!input && (
                <div className="text-[30px] text-lime-400/40 font-bold">
                    Search Users...
                </div>
            )}
        </div>
    );
}

export default Search;
