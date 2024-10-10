import React from "react";
import { Link } from "react-router-dom";
import { NewtabPageWrapper } from "../components/NewtabPageWrapper";
import { useCurrentTime } from "../../../hooks/useCurrentTime";
import { SidebarOpener } from "../../../messaging/SidebarOpener";

type LinkRef = {
    to: string;
    title: string;
}
    | {
        action: Function;
        title: string;
    }
const links = [
    { to: "/clippings-explorer", title: "Clippings" },
    {
        title: "Chat", action: async () => {
            const sidebarOpener = new SidebarOpener();
            await sidebarOpener.openSidebar({
                targetPage: "/chat"
            });
        }
    },
    { to: "/settings", title: "Settings" },
]

export const NewtabHomepage: React.FC = () => {
    const { clockTimeString, dateString } = useCurrentTime();

    return (
        <NewtabPageWrapper pageTitle="" hideNavigationBar hidePageTitle>
            <div className="flex flex-col h-full">
                <div className="flex flex-row gap-4 py-4">
                    {
                        links.map((link: LinkRef) => {
                            if ('action' in link) {
                                return (
                                    <button key={link.title} className="link" onClick={() => link.action()}>
                                        {link.title}
                                    </button>
                                )
                            }

                            return (
                                <Link key={link.to} className="link" to={link.to}>
                                    {link.title}
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="flex-grow-[2]">&nbsp;</div>
                <div className="flex flex-col text-4xl font-bold text-center justify-center gap-4 flex-grow-[4]">
                    <div>
                        {clockTimeString}
                    </div>
                    <div className="text-2xl">
                        Knowledge is power.
                    </div>
                </div>
                <div className="flex-grow-[2]">
                    <div className="flex flex-row justify-center text-center">
                        <span className="text-xl">Welcome!</span>
                    </div>
                </div>
                <div className="flex flex-row py-4">Footer</div>
            </div>

        </NewtabPageWrapper>
    )
}