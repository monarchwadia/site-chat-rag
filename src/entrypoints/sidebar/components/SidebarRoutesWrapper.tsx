import React, { useEffect } from "react";
import { useSidebarOpener } from "../../../hooks/useSidebarOpener";
import { Outlet, useNavigate } from "react-router-dom";

type Props = React.PropsWithChildren<{

}>;

export const SidebarRoutesWrapper: React.FC<Props> = ({ children }) => {
    const sidebarOpener = useSidebarOpener();
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = sidebarOpener.onOpenSidebar((opts) => {
            navigate(opts.targetPage);
        });

        return () => {
            unsubscribe();
        }
    }, [])

    return <Outlet />;
}