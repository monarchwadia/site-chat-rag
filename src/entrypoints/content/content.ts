import { liveQuery } from "dexie";
import { db } from "../../storage/db";

(function contentScript() {
    console.log('Content script loaded!') // TODO: remove

    chrome.runtime.onMessage.addListener((message) => {
        alert('message received');
        debugger;
        switch (message.type) {
            case 'zap':
                alert('I was zapped!');
                break;
            case 'capture-innerhtml-request':
                alert('Capture inner html request received');
                // get innerhtml
                const headInnerHTML = document.head.innerHTML;
                const bodyInnerHTML = document.body.innerHTML;

                // send message back
                chrome.runtime.sendMessage({
                    type: 'capture-innerhtml-success',
                    payload: {
                        requestId: message.payload.requestId,
                        head: headInnerHTML,
                        body: bodyInnerHTML
                    }
                });

                // convert to text
                break;
        }
    });
})()