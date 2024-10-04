import type { UserMessage as RaggedUserMessage } from "ragged";
import React from "react";

type Props = React.PropsWithChildren<{
    message: RaggedUserMessage
}>;

export const UserMessage: React.FC<Props> = ({ message }) => {
    return (
        <div className="flex flex-col bg-base-300 text-base-content">
            {message.text}
        </div>
    )
}