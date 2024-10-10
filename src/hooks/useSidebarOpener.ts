import { useMemo } from "react";
import { SidebarOpener } from "../messaging/SidebarOpener";

export const useSidebarOpener = () => {
    const sidebarOpener = useMemo(() => {
        return new SidebarOpener();
    }, []);

    return sidebarOpener;
}