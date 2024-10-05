import React from "react";
import { useChatSession } from "../../../hooks/useChatSession";
import { ChatSessionMessage } from "./ChatSessionMessage/ChatSessionMessage";
import type { AiConnection } from "../../../storage/storage.types";

type Props = React.PropsWithChildren<{
    aiConnection: AiConnection;
}>;

export const ChatSession: React.FC<Props> = ({ aiConnection }) => {
    const { messages } = useChatSession({
        aiConnection
    });

    return (
        <div className="flex flex-col">
            {messages.map((msg, i) => <ChatSessionMessage message={msg} key={JSON.stringify(msg)} />)}
        </div>
    )
}