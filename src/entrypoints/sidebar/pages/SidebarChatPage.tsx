import React from "react";
import { ChatSessionComponent } from "../components/ChatSessionComponent";
import { SidebarPageWrapper } from "../components/SidebarPageWrapper";
import { useAiConnectionsManager } from "../../../hooks/useDbAiConnections";
import { AiConnectionSettings } from "../components/AiConnectionSettings";
import { useAllChatSessions } from "../../../hooks/useDbChatSessions";
import { useAppSettings } from "../../../hooks/useAppSettings";

type Props = React.PropsWithChildren<{

}>;

export const SidebarChatPage: React.FC<Props> = ({ }) => {
    const chatSessions = useAllChatSessions();
    const { setPinnedChatSessionId } = useAppSettings();

    const pinChatSession = async (id: string) => {
        await setPinnedChatSessionId(id);
    }

    return (
        <SidebarPageWrapper pageTitle="Chat">
            <div className="flex flex-col">
                <ChatSessionComponent />
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold">Chat Sessions</h2>
                    {chatSessions.map((cs) => (
                        <div className="card card-bordered" key={cs.id} onClick={() => pinChatSession(cs.id)}>
                            <div className="card-body">
                                <div>{cs.id}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SidebarPageWrapper>
    )
}