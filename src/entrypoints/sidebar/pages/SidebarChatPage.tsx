import React from "react";
import { ChatSession } from "../components/ChatSession";
import { SidebarPageWrapper } from "../components/SidebarPageWrapper";
import { useAiConnectionsManager } from "../../../hooks/useAiConnectionsManager";
import { AiConnectionSettings } from "../components/AiConnectionSettings";
import { useChatSessions } from "../../../hooks/useChatSessions";

type Props = React.PropsWithChildren<{

}>;

export const SidebarChatPage: React.FC<Props> = ({ }) => {
    const chatSessions = useChatSessions();
    return (
        <SidebarPageWrapper pageTitle="Chat">
            <div className="flex flex-col">
                <ChatSession />
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold">Chat Sessions</h2>
                    {chatSessions.map((cs) => (
                        <div className="card card-bordered" key={cs.id}>
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