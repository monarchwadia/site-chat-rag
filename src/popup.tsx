import React from "react";
import { createRoot } from 'react-dom/client';

// Render your React component instead
const rootElem = document.getElementById('out');
if (!rootElem) {
    throw new Error('Root element not found. This is probably a programmer error.');
}
const root = createRoot(rootElem);
root.render(<h1>Button!</h1>);
