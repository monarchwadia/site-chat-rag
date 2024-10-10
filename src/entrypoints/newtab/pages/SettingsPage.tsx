import React from "react";
import { AiConnectionSettings } from "../../../components/AiConnectionSettings";
import { NewtabPageWrapper } from "../components/NewtabPageWrapper";

type Props = React.PropsWithChildren<{

}>;

export const SettingsPage: React.FC<Props> = ({ }) => {
    return (
        <NewtabPageWrapper pageTitle="Settings">
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold">AI Connection Settings</h2>
                    <AiConnectionSettings />
                </div>
            </div>
        </NewtabPageWrapper>
    )
}