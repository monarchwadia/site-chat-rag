import React from "react";
import { NewtabPageWrapper } from "../components/NewtabPageWrapper";
import { useAllChatSessions } from "../../../hooks/useDbChatSessions";
import { useAppSettings } from "../../../hooks/useAppSettings";
import { ChatHistoryList } from "../../../components/ChatHistoryList";

type Props = React.PropsWithChildren<{

}>;

export const HistoryPage: React.FC<Props> = ({ }) => {
    const { chatSessions, pinnedChatSession } = useAllChatSessions();
    const { setPinnedChatSessionId } = useAppSettings();

    const pinChatSession = async (id: string) => {
        await setPinnedChatSessionId(id);
    }

    return (
        <NewtabPageWrapper pageTitle="History">
            <div className="flex flex-col">
                <h2 className="text-lg font-bold">Chat Sessions</h2>
                {
                    <ChatHistoryList
                        chatSessions={chatSessions}
                        pinnedChatSessionId={pinnedChatSession?.id}
                        onChatSessionClick={pinChatSession}
                    />
                }
            </div>
        </NewtabPageWrapper>
    )
}