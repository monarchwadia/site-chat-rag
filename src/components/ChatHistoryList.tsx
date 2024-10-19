import React from "react";
import type { ChatSession } from "../storage/db.types";

type Props = React.PropsWithChildren<{
    chatSessions: ChatSession[];
    pinnedChatSessionId: string | undefined;
    onChatSessionClick: (id: string) => void;
}>;

export const ChatHistoryList: React.FC<Props> = ({ chatSessions, pinnedChatSessionId, onChatSessionClick }) => {
    return (
        <div className="flex flex-col gap-2">
            {chatSessions.map((cs) => (
                <div className="card card-bordered cursor-pointer bg-base-100 hover:bg-base-200 transition-colors" key={cs.id} onClick={() => onChatSessionClick(cs.id)}>
                    <div className="card-body">
                        <div className="flex flex-row gap-2">
                            <div>{cs.id}</div>
                            {pinnedChatSessionId === cs.id && <div className="badge badge-neutral">Pinned</div>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}