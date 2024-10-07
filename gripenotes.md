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

Next, I need to build the simplest version of the automation tool:
- collect data as clippings
  - start with text-only clipping
- save clippings to a collection
- chat with one or more collections

# 2024-10-04 to 2024-10-05 early morning

- Made a lot of progress.
- Chat is now working against openai.
- Settings page with ability to add connections is now working.
- Chat with clippings is now working.

The chat is really broken, need to fix that up before i move on to other functionality.

# 2024-10-05

Made improvements in various areas. Turns out that the difficulties with chat behaviour come down to how Ragged is duplicating chat messages inside the returned object.history.

```ts
    // setting history to send up.. everything fine so far
    c.history = [{
      type: "system",
      text: clippingsContext
    }, ...messagesClone];

    setIsBusy(true);
    const {
      history: newMessages
    } = await c.chat(m);

    // Issue 1: newMessages has duplicated the `m` message here, leading to unreliable history.
    // Issue 2: I don't have access to just the new responses. Since we're manually managing history, this is a problem, because clippings need to be removed from the history for each chat run.
```

Looks like a Ragged bug. Need to fix this first.

---

Oh, wasn't a Ragged bug. I just accidentally was passing in the last message twice. Fixed that.