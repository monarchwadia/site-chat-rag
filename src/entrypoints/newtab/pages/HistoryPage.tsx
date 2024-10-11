import React from "react";
import { NewtabPageWrapper } from "../components/NewtabPageWrapper";
import { useAllChatSessions } from "../../../hooks/useDbChatSessions";
import { useAppSettings } from "../../../hooks/useAppSettings";

type Props = React.PropsWithChildren<{

}>;

export const HistoryPage: React.FC<Props> = ({ }) => {
    const chatSessions = useAllChatSessions();
    const { setPinnedChatSessionId } = useAppSettings();

    const pinChatSession = async (id: string) => {
        await setPinnedChatSessionId(id);
    }

    return (
        <NewtabPageWrapper pageTitle="History">
            <div className="flex flex-col">
                <h2 className="text-lg font-bold">Chat Sessions</h2>
                {chatSessions.map((cs) => (
                    <div className="card card-bordered" key={cs.id} onClick={() => pinChatSession(cs.id)}>
                        <div className="card-body">
                            <div>{cs.id}</div>
                        </div>
                    </div>
                ))}
            </div>
        </NewtabPageWrapper>
    )
}