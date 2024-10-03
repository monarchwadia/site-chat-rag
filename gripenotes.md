# 2024-10-02

- Successfully created vanilla unpacked chrome extension. Going to go with this as far as I can before I add in build tools.
- Turns out Node v22 breaks gulp... downgrading to Node 20.12.2
- Livereload now works
- Added Rollup and Typescript
- Added Tailwind and Daisy and set theme to Cupcake

I still need to add React by adding it as a plugin to rollup, but I'm going to take a break for now. For some reason, React is not being bundled into the `dist/sidebar.js` file.

I'm happy with the progress I've made today & I'm going to call it a day. I'll pick this up tomorrow.

# 2024-10-03

- Build process now has babel, which is transpiling the React code. More tricky than it looks at first. I've been spoiled by vite et al
- Build is working in both `development` (unminified) and `production` (minified) modes

Next, I need to prove sidebar+dropdown+newtab views, communication between them, and persistence. After that is done, I'll be able to build the automation tool.

- Created sidebar,dropdown,newtab views. Moved styles to common.css.
- Did a lot of mucking around in the build process to make things work smoothly. Now they're working smoothly.
- Persistence and communication now working through Dexie.

I should probably remove the `copyFiles`... or reduce it to just copy `manifest.json`

Also, should I include `"externally_connectable": {"ids": []}` in manifest.json to stop other extensions from connecting to this one? Will that increase security? Have not added, for now. Maybe add back in later, once app is working...

- Messaging between content script and components now working!

Turned out the right formula was to use `chrome.tabs.sendMessage(<tabId>, <message>)` from the content script to the background script, and then `chrome.runtime.onMessage.addListener` in the background script to send the message to the components.