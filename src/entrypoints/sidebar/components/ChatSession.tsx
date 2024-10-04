import React from "react";
import { useChatSession } from "../../../hooks/useChatSession";
import { ChatSessionMessage } from "./ChatSessionMessage/ChatSessionMessage";

type Props = React.PropsWithChildren<{

}>;

export const ChatSession: React.FC<Props> = ({ }) => {
    const { messages } = useChatSession();

    return (
        <div className="flex flex-col">
            {messages.map((msg, i) => <ChatSessionMessage message={msg} key={JSON.stringify(msg)} />)}
        </div>
    )
}