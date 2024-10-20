import React from "react";
import { ChatSessionComponent } from "../components/ChatSessionComponent";
import { SidebarPageWrapper } from "../components/SidebarPageWrapper";

type Props = React.PropsWithChildren<{

}>;

export const SidebarHomePage: React.FC<Props> = ({ }) => {
    return (
        <SidebarPageWrapper>
            <ChatSessionComponent />
        </SidebarPageWrapper>
    )
}