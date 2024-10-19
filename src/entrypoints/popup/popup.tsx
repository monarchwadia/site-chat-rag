import React, { useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { v4 } from 'uuid';
import { MKEY_CAPTURE_WEBSITE_TEXT_FAILURE, MKEY_CAPTURE_WEBSITE_TEXT_REQUEST, MKEY_CAPTURE_WEBSITE_TEXT_SUCCESS } from "../../constants";
import { db } from "../../storage/db";
import { openSidebarChat } from "../../utils/openSidebarChat";

// Render your React component instead
const rootElem = document.getElementById('out');
if (!rootElem) {
    throw new Error('Root element not found. This is probably a programmer error.');
}
const Main = () => {
    const requestIdsSet = React.useMemo(() => new Set<string>(), []);

    useEffect(() => {
        // listen for capture-innerhtml-success and capture-innerhtml-failure
        const listener = async (message: any, sender: chrome.runtime.MessageSender) => {
            if (message?.payload?.requestId && requestIdsSet.has(message.payload.requestId)) {
                // remove from requestIds
                requestIdsSet.delete(message.payload.requestId);

                switch (message.type) {
                    case MKEY_CAPTURE_WEBSITE_TEXT_SUCCESS:
                        console.log('captured inner html', message.payload);
                        // convert html to text
                        console.log('captured text', message.payload.text);

                        // persist to storage
                        const newClipping = await db.textClippings.add({
                            id: v4(),
                            title: message.payload.pageTitle,
                            text: message.payload.text,
                        })
                        // show success message
                        break;
                    case MKEY_CAPTURE_WEBSITE_TEXT_FAILURE:
                        console.error('failed to capture inner html', message.payload);
                        // TODO: show error message
                        break;
                    default:
                        console.error('unexpected message', message);
                        break;
                }
            }
        }


        // persist text to storage
        // show success message

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
            type: MKEY_CAPTURE_WEBSITE_TEXT_REQUEST,
            payload: {
                requestId: uuid
            }
        });
    }

    return (
        <div>
            <button className="btn btn-info btn-sm w-fit" onClick={handleCapturePage}>Capture page as clipping</button>
            <button className="btn btn-info btn-sm w-fit" onClick={openSidebarChat}>Open Chat</button>
        </div>
    )
}

const root = createRoot(rootElem);
root.render(<Main />);
