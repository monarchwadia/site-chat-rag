import React, { useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { CommsTestWidget } from "../../components/CommsTestWidget";
import { v4 } from 'uuid';

// Render your React component instead
const rootElem = document.getElementById('out');
if (!rootElem) {
    throw new Error('Root element not found. This is probably a programmer error.');
}
const Main = () => {
    const requestIdsSet = React.useMemo(() => new Set<string>(), []);

    useEffect(() => {
        // listen for capture-innerhtml-success and capture-innerhtml-failure
        const listener = (message: any, sender: chrome.runtime.MessageSender) => {
            if (message?.payload?.requestId && requestIdsSet.has(message.payload.requestId)) {
                // remove from requestIds
                requestIdsSet.delete(message.payload.requestId);
                if (message.type === 'capture-innerhtml-success') {
                    console.log('captured inner html', message.payload);
                    alert('captured inner html');
                    // persist to storage
                    // show success message
                } else if (message.type === 'capture-innerhtml-failure') {
                    console.error('failed to capture inner html', message.payload.error);
                    alert('failed to capture inner html');
                    // show failure message
                }
            }

            // convert html to text
            // persist text to storage
            // show success message
        }

        chrome.runtime.onMessage.addListener(listener);

        return () => {
            chrome.runtime.onMessage.removeListener(listener);
        }
    }, [])

    const handleCapturePage = async () => {
        // get active tab
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tabs.length !== 1) {
            console.error('Expected exactly one active tab, but found', tabs.length);
            return;
        }

        const tab = tabs[0]

        if (!tab?.id) {
            alert('No tab found');
            return;
        }

        const uuid = v4();
        requestIdsSet.add(uuid);

        await chrome.tabs.sendMessage(tab.id, {
            type: 'capture-innerhtml-request',
            payload: {
                requestId: uuid
            }
        });
    }

    return (
        <div>
            <button className="btn btn-info" onClick={handleCapturePage}>Capture page as clipping</button>
            <CommsTestWidget label="Popup" />
        </div>
    )
}

const root = createRoot(rootElem);
root.render(<Main />);
