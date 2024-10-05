import React from "react";
import { useChatSession } from "../../../hooks/useChatSession";
import { ChatSessionMessage } from "./ChatSessionMessage/ChatSessionMessage";
import type { AiConnection } from "../../../storage/storage.types";
import { useAiConnectionsManager } from "../../../hooks/useAiConnectionsManager";

type Props = React.PropsWithChildren<{

}>;

export const ChatSession: React.FC<Props> = ({ }) => {
    const { getDefaultAiConnection } = useAiConnectionsManager();

    const { messages } = useChatSession({
        aiConnection: getDefaultAiConnection()
    });

    return (
        <div className="flex flex-col">
            {messages.map((msg, i) => <ChatSessionMessage message={msg} key={JSON.stringify(msg)} />)}
        </div>
    )
}