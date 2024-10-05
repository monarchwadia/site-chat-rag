import React, { type FormEventHandler } from "react";
import { useChatSession } from "../../../hooks/useChatSession";
import { ChatSessionMessage } from "./ChatSessionMessage/ChatSessionMessage";
import type { AiConnection } from "../../../storage/storage.types";
import { useAiConnectionsManager } from "../../../hooks/useAiConnectionsManager";

type Props = React.PropsWithChildren<{

}>;

export const ChatSession: React.FC<Props> = ({ }) => {
    const { getDefaultAiConnection } = useAiConnectionsManager();

    const { messages, sendMessage } = useChatSession({
        aiConnection: getDefaultAiConnection()
    });

    const handleSend: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const chatInput = e.currentTarget.querySelector("#chat-input") as HTMLTextAreaElement;
        const val = chatInput.value;
        sendMessage();
    }

    return (
        <div className="flex flex-col">
            {messages.map((msg, i) => <ChatSessionMessage message={msg} key={JSON.stringify(msg)} />)}
            <form className="flex flex-row" onSubmit={handleSend}>
                <div className="flex-grow">
                    <textarea id="chat-input" className="textarea textarea-bordered textarea-primary w-full" placeholder="Type a message..." />
                </div>
                <div className="flex-none items-baseline justify-end">
                    <button className="btn btn-primary">Send</button>
                </div>
            </form>
        </div>
    )
}