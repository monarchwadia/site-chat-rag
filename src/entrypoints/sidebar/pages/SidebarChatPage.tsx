import React from "react";
import { ChatSession } from "../components/ChatSession";
import { SidebarPageWrapper } from "../components/SidebarPageWrapper";
import { useAiConnectionsManager } from "../../../hooks/useAiConnectionsManager";
import { AiConnectionSettings } from "../components/AiConnectionSettings";

type Props = React.PropsWithChildren<{

}>;

export const SidebarChatPage: React.FC<Props> = ({ }) => {
    return (
        <SidebarPageWrapper pageTitle="Chat">
            <div className="flex flex-col">
                <ChatSession />
            </div>
        </SidebarPageWrapper>
    )
}