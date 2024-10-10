import React from "react";
import { Link } from "react-router-dom";

type Props = React.PropsWithChildren<{
    pageTitle: string;
    hideNavigationBar?: boolean;
    hidePageTitle?: boolean;
}>;
export const SidebarPageWrapper: React.FC<Props> = ({ children, pageTitle, hideNavigationBar, hidePageTitle }) => {
    return (
        <div className="flex flex-col gap-2 h-full py-4 px-8">
            {!hideNavigationBar && <div className="flex flex-row gap-2">
                <Link to="/" className="text-lg link">🏠 Home</Link>
            </div>}
            {!hidePageTitle && <h1 className="text-xl font-bold">{pageTitle}</h1>}
            {children}
        </div>
    )
}