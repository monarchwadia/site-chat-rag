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
