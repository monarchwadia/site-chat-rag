import React from "react";
import { Link } from "react-router-dom";
import { useAllChatSessions } from "../../../hooks/useDbChatSessions";
import { ChatHistoryList } from "../../../components/ChatHistoryList";
import { useAppSettings } from "../../../hooks/useAppSettings";

export const SidebarHomePage: React.FC = () => {
    const { chatSessions, pinnedChatSession } = useAllChatSessions();
    const { setPinnedChatSessionId } = useAppSettings();

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            <Link to="/">Go to Page 1</Link>
            <div className="flex flex-col gap-2">
                <ChatHistoryList
                    chatSessions={chatSessions}
                    pinnedChatSessionId={pinnedChatSession?.id}
                    onChatSessionClick={(sessionId) => {
                        setPinnedChatSessionId(sessionId);
                    }}
                />
            </div>

        </div>
    )
}