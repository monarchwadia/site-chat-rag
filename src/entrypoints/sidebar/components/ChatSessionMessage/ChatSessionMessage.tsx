import type { Message } from "ragged";
import React from "react";

type Props = React.PropsWithChildren<{
    message: Message;
}>;

export const ChatSessionMessage: React.FC<Props> = ({ message }) => {
    switch (message.type) {
        case "bot":
            return (
                <div className="flex flex-col bg-base-100 text-base-content">
                    {message.text}
                </div>
            );
        case "user":
            return (
                <div className="flex flex-col bg-base-300 text-base-content">
                    {message.text}
                </div>
            );
        default:
            return null;
    }
}