import React from "react";
import Messages from "../pages/Messages";

function RightHome() {
    return (
        <aside className="w-[25%] h-screen bg-gradient-to-b from-gray-950 to-black border-l border-lime-500/20 hidden lg:flex flex-col">
            <header className="p-5 h-24 flex items-center justify-between border-b border-gray-800 shrink-0">
                <h2 className="text-2xl font-bold text-white">Messages</h2>
                {/* You can add an icon for "New Message" here if needed */}
            </header>
            <div className="overflow-y-auto flex-grow">
                <Messages />
            </div>
        </aside>
    );
}

export default RightHome;
