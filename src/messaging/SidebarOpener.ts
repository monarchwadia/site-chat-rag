import { retry } from "../utils/retry";

type MessageListener = Parameters<typeof chrome.runtime.onMessage.addListener>[0];

type OpenSidebarOptions = {
    targetPage: "/"
}

export class SidebarOpener {
    private readonly OPEN_SIDEBAR = 'open-sidebar';

    async openSidebar(opts: OpenSidebarOptions) {
        const currentTab = await chrome.tabs.getCurrent();
        const currentWindow = await chrome.windows.getCurrent();

        try {
            if (currentWindow?.id) {
                await chrome.sidePanel.open({
                    windowId: currentWindow.id,
                })
            } else if (currentTab?.id) {
                await chrome.sidePanel.open({
                    tabId: currentTab.id,
                })
            } else {
                throw new Error("Could not find current tab or window");
            }
        } catch (e) {
            console.error('Failed to open chat', e);
            return;
        }

        await retry(async () => {
            await chrome.runtime.sendMessage({
                type: this.OPEN_SIDEBAR,
                targetPage: opts.targetPage
            });
        }, {
            maxRetries: 5,
            intervalMs: 100
        });
    }

    onOpenSidebar(handler: (opts: OpenSidebarOptions) => void) {
        const listener: MessageListener = (message, sender, sendResponse) => {
            if (message.type === this.OPEN_SIDEBAR) {
                handler(message);
            }
        }

        chrome.runtime.onMessage.addListener(listener);

        return () => {
            chrome.runtime.onMessage.removeListener(listener);
        }
    }
}