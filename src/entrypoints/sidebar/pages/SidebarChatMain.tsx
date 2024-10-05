import React from "react";
import { ChatSession } from "../components/ChatSession";
import { SidebarPageWrapper } from "../components/SidebarPageWrapper";
import { useAiConnectionsManager } from "../../../hooks/useAiConnectionsManager";
import { AiConnectionSettings } from "../components/AiConnectionSettings";

type Props = React.PropsWithChildren<{

}>;

export const SidebarChatMainPage: React.FC<Props> = ({ }) => {
    const { createAiConnection, listAllAiConnections } = useAiConnectionsManager();


    return (
        <SidebarPageWrapper pageTitle="Chat">
            <div className="flex flex-col">
                <AiConnectionSettings />
                <ChatSession />
            </div>
        </SidebarPageWrapper>
    )
}