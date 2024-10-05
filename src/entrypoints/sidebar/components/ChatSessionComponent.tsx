import React, { useEffect, type FormEventHandler } from "react";
import { useChatService } from "../../../hooks/useChatService";
import { ChatSessionMessage } from "./ChatSessionMessage/ChatSessionMessage";
import type { AiConnection } from "../../../storage/db.types";
import { useAiConnectionsManager } from "../../../hooks/useDbAiConnections";
import { useAppSettings } from "../../../hooks/useAppSettings";

type Props = React.PropsWithChildren<{

}>;

export const ChatSessionComponent: React.FC<Props> = ({ }) => {
    const { defaultAiConnectionId } = useAppSettings();
    const { messages, sendMessage, status, isSendDisabled } = useChatService({
        aiConnectionId: defaultAiConnectionId
    });

    const handleSend: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const chatInput = e.currentTarget.querySelector("#chat-input") as HTMLTextAreaElement;
        const val = chatInput.value;
        sendMessage(val);
    }

    return (
        <div className="flex flex-col">
            {messages.map((msg, i) => <ChatSessionMessage message={msg} key={JSON.stringify(msg) + '-' + i} />)}
            {messages.map((msg, i) => <div key={JSON.stringify(msg) + '-' + i}>{JSON.stringify(msg) + '-' + i}</div>)}
            <hr className="divider" />
            <div>Status: {status}</div>
            <form className="flex flex-row" onSubmit={handleSend}>
                <div className="flex-grow">
                    <textarea id="chat-input" className="textarea textarea-bordered textarea-primary w-full" placeholder="Type a message..." />
                </div>
                <div className="flex-none items-baseline justify-end">
                    <button className="btn btn-primary" type="submit" disabled={isSendDisabled}>Send</button>
                </div>
            </form>
        </div>
    )
}