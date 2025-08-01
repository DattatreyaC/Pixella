import React from "react";
import Messages from "../pages/Messages";

function RightHome() {
    return (
        <div className="w-[25%] min-h-[100vh] bg-[black] border-l-1 border-lime-400/50  hidden lg:block">
            <Messages />
        </div>
    );
}

export default RightHome;
