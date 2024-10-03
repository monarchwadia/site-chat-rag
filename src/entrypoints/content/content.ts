import { liveQuery } from "dexie";
import { db } from "../../storage/db";

(function contentScript() {
    console.log('Content script loaded!') // TODO: remove

    chrome.runtime.onMessage.addListener((message) => {
        alert('message received');
        if (message.type === 'zap') {
            alert('I was zapped!')
        }
    });
})()