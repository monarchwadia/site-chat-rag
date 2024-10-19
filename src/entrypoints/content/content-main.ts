import { liveQuery } from "dexie";
import { db } from "../../storage/db";
import { MKEY_CAPTURE_WEBSITE_TEXT_FAILURE, MKEY_CAPTURE_WEBSITE_TEXT_REQUEST, MKEY_CAPTURE_WEBSITE_TEXT_SUCCESS } from "../../constants";

(function contentMain() {
    console.log('Content script loaded!') // TODO: remove

    chrome.runtime.onMessage.addListener((message) => {
        switch (message.type) {
            case 'zap':
                alert('I was zapped!');
                break;
            case MKEY_CAPTURE_WEBSITE_TEXT_REQUEST:
                // const headInnerHTML = document.head.innerHTML;
                // const bodyInnerHTML = document.body.innerHTML;

                const target = document.body;
                const selection = window.getSelection();
                if (!selection) {
                    console.error('No selection found');
                    chrome.runtime.sendMessage({
                        type: MKEY_CAPTURE_WEBSITE_TEXT_FAILURE,
                        payload: {
                            requestId: message.payload.requestId,
                        }
                    });
                    break;
                }
                const range = document.createRange();
                range.selectNodeContents(target);
                selection.removeAllRanges();
                selection.addRange(range);
                const str = selection.toString();
                selection.removeAllRanges();

                // send message back
                chrome.runtime.sendMessage({
                    type: MKEY_CAPTURE_WEBSITE_TEXT_SUCCESS,
                    payload: {
                        requestId: message.payload.requestId,
                        text: str
                    }
                });
                break;
        }
    });
})();