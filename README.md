# Site Chat

## Dev Workflow

1. Run `pnpm install`
2. Run `pnpm watch` (or you can use `pnpm build` for a one-time build)
3. In Chrome, go to Extensions.
4. Enable Developer Mode if you have not already done so.
5. Click Load Unpacked.
6. Select the `dist` directory in this project.
7. Edit the files and refresh the extension in Chrome to see changes. If you need to make changes to the manifest, you will need to reload the extension.

## Bundling for production

1. Run `pnpm build:prod`