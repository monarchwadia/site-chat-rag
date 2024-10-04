import React from "react";
import { ChatSession } from "../components/ChatSession";

type Props = React.PropsWithChildren<{

}>;

export const SidebarChatMainPage: React.FC<Props> = ({ }) => {
    return (
        <div className="flex flex-col">
            <ChatSession />
        </div>
    )
}