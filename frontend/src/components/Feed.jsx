import React from "react";
import { FaRegHeart } from "react-icons/fa6";
import StoryDp from "./StoryDp";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { BiMessageAltDetail } from "react-icons/bi";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
function Feed() {
    const { postData } = useSelector((state) => state.post);
    const { userData, notificationData } = useSelector((state) => state.user);
    const { storyList, currentUserStory } = useSelector((state) => state.story);
    const navigate = useNavigate();
    return (
        <main className="lg:w-[50%] w-full bg-gradient-to-b from-gray-950 to-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto">
            {/* --- Mobile Header --- */}
            <header className="w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden sticky top-0 z-40 bg-black/50 backdrop-blur-md border-b border-gray-800">
                <h1 className="bg-gradient-to-r from-lime-400 to-lime-200 text-transparent bg-clip-text font-splash text-5xl">
                    Pixella
                </h1>
                <div className="flex items-center gap-2">
                    <button
                        className="relative p-2 rounded-full hover:bg-gray-800 transition-colors"
                        onClick={() => navigate("/notifications")}
                        aria-label="Notifications"
                    >
                        <FaRegHeart className="text-gray-200 w-[25px] h-[25px]" />
                        {notificationData?.some((noti) => !noti.isRead) && (
                            <span className="w-2.5 h-2.5 bg-lime-400 rounded-full absolute top-1.5 right-1.5 border-2 border-gray-950"></span>
                        )}
                    </button>
                    <button
                        className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                        onClick={() => navigate("/messages")}
                        aria-label="Messages"
                    >
                        <BiMessageAltDetail className="text-gray-200 w-[25px] h-[25px]" />
                    </button>
                </div>
            </header>

            {/* --- Stories Section --- */}
            <section className="flex w-full justify-start overflow-x-auto gap-[10px] items-center p-[20px] border-b border-lime-500/20">
                <StoryDp
                    userName={"Your Story"}
                    ProfileImage={userData.profileImage}
                    story={currentUserStory}
                />
                {storyList?.map((story) => (
                    <StoryDp
                        key={story.id}
                        userName={story.author.userName}
                        ProfileImage={story.author.profileImage}
                        story={story}
                    />
                ))}
            </section>

            {/* --- Posts Feed --- */}
            <div className="w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[5px] pt-[40px] relative pb-[120px]">
                {postData &&
                    postData.map((post) => <Post post={post} key={post.id} />)}
                <Nav />
            </div>
        </main>
    );
}

export default Feed;
