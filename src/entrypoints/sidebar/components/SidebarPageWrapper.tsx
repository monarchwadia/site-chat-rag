import React from "react";
import { Link } from "react-router-dom";

type Props = React.PropsWithChildren<{

}>;
export const SidebarPageWrapper: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex flex-col gap-2 h-full py-4 px-8">
            {children}
        </div>
    )
}