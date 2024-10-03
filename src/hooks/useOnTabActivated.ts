import { useEffect } from "react"

export type OnTabActivatedHandler = Parameters<typeof chrome.tabs.onActivated.addListener>[0];

export const useOnTabActivated = (handler: OnTabActivatedHandler) => {
    useEffect(() => {
        chrome.tabs.onActivated.addListener(handler)

        return () => {
            chrome.tabs.onActivated.removeListener(handler)
        }
    })
}