// const elem: HTMLElement | null = document.getElementById("out");
// if (elem) {
//     elem.innerHTML = "Hello Typescript!!!!!";
// }
import React from "react";
import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const rootElem = document.getElementById('out');
if (!rootElem) {
    throw new Error('Root element not found. This is probably a programmer error.');
}
const root = createRoot(rootElem);
root.render(<h1>Hello, world </h1>);
