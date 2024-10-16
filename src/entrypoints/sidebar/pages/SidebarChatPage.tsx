import React from "react";
import { ChatSessionComponent } from "../components/ChatSessionComponent";
import { SidebarPageWrapper } from "../components/SidebarPageWrapper";
import { useAiConnectionsManager } from "../../../hooks/useDbAiConnections";
import { AiConnectionSettings } from "../../../components/AiConnectionSettings";
import { useAllChatSessions } from "../../../hooks/useDbChatSessions";
import { useAppSettings } from "../../../hooks/useAppSettings";

type Props = React.PropsWithChildren<{

}>;

export const SidebarChatPage: React.FC<Props> = ({ }) => {
    return (
        <SidebarPageWrapper pageTitle="Chat">
            <div className="flex flex-col">
                <ChatSessionComponent />
            </div>
        </SidebarPageWrapper>
    )
}