import React from "react";
import { ChatSession } from "../components/ChatSession";
import { SidebarPageWrapper } from "../components/SidebarPageWrapper";
import { useAiConnectionsManager } from "../../../hooks/useDbAiConnections";
import { AiConnectionSettings } from "../components/AiConnectionSettings";

type Props = React.PropsWithChildren<{

}>;

export const SettingsPage: React.FC<Props> = ({ }) => {
    return (
        <SidebarPageWrapper pageTitle="Settings">
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold">AI Connection Settings</h2>
                    <AiConnectionSettings />
                </div>
            </div>
        </SidebarPageWrapper>
    )
}