(async function content() {
    const src = chrome.runtime.getURL("entrypoints/content/content-main.js");
    const contentMain = await import(src);
    // contentMain.main();
})();
