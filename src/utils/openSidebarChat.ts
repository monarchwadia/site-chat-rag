import { SidebarOpener } from "../messaging/SidebarOpener";

export const openSidebarChat = async () => {
    try {
        const sidebarOpener = new SidebarOpener();
        await sidebarOpener.openSidebar({
            targetPage: "/"
        });
    } catch (e) {
        console.error("Could not open sidebar", e);
    }
}