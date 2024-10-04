import type { BotMessage as RaggedBotMessage } from "ragged";
import React from "react";

type Props = React.PropsWithChildren<{
    message: RaggedBotMessage
}>;

export const BotMessage: React.FC<Props> = ({ message }) => {
    return (
        <div className="flex flex-col bg-base-100 text-base-content">
            {message.text}
        </div>
    )
}