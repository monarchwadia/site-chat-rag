import { liveQuery } from "dexie";
import { db } from "../../storage/db";
import { MKEY_CAPTURE_WEBSITE_TEXT_FAILURE, MKEY_CAPTURE_WEBSITE_TEXT_REQUEST, MKEY_CAPTURE_WEBSITE_TEXT_SUCCESS } from "../../constants";

const getBodyText = () => {
    const target = document.body;
    const selection = window.getSelection();
    if (!selection) {
        return null;
    }
    const range = document.createRange();
    range.selectNodeContents(target);
    selection.removeAllRanges();
    selection.addRange(range);
    const str = selection.toString();
    selection.removeAllRanges();
    return str;
}

(function contentMain() {
    console.log('Content script loaded!') // TODO: remove

    chrome.runtime.onMessage.addListener((message) => {
        switch (message.type) {
            case MKEY_CAPTURE_WEBSITE_TEXT_REQUEST:
                const str = getBodyText();
                if (!str) {
                    console.error('No text found in current tab.');
                    chrome.runtime.sendMessage({
                        type: MKEY_CAPTURE_WEBSITE_TEXT_FAILURE,
                        payload: {
                            requestId: message.payload.requestId
                        }
                    });
                    break;
                }

                // send message back
                chrome.runtime.sendMessage({
                    type: MKEY_CAPTURE_WEBSITE_TEXT_SUCCESS,
                    payload: {
                        requestId: message.payload.requestId,
                        pageTitle: document.title || 'Untitled',
                        text: str
                    }
                });
                break;
        }
    });
})();