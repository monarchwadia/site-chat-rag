import React from "react";
import { createRoot } from 'react-dom/client';
import { CommsTestWidget } from "./components/CommsTestWidget";

// Render your React component instead
const rootElem = document.getElementById('out');
if (!rootElem) {
    throw new Error('Root element not found. This is probably a programmer error.');
}
const Main = () => {
    return (
        <div>
            <CommsTestWidget label="Sidebar" />
        </div>
    )
}

const root = createRoot(rootElem);
root.render(<Main />);

