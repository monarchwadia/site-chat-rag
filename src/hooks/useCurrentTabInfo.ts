import { useEffect, useState } from "react";
import { useOnTabActivated } from "./useOnTabActivated";

export const useCurrentTabInfo = () => {
    const [tabId, setTabId] = useState<number>(chrome.tabs.TAB_ID_NONE);
    const [windowId, setWindowId] = useState<number>(chrome.tabs.TAB_ID_NONE);

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            setTabId(tabs[0].id ?? chrome.tabs.TAB_ID_NONE)
            setWindowId(tabs[0].windowId ?? chrome.tabs.TAB_ID_NONE)
        })
    })

    useOnTabActivated((activeInfo) => {
        setTabId(activeInfo.tabId)
        setWindowId(activeInfo.windowId)
    })

    return { tabId, windowId }
}
