import { useEffect } from "react"

export type OnTabUpdatedHandler = Parameters<typeof chrome.tabs.onUpdated.addListener>[0];

export const useOnTabUpdated = (handler: OnTabUpdatedHandler) => {
    useEffect(() => {
        chrome.tabs.onUpdated.addListener(handler)

        return () => {
            chrome.tabs.onUpdated.removeListener(handler)
        }
    })
}