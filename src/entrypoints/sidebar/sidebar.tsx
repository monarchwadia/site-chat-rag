import React, { useState } from "react";
import { createRoot } from 'react-dom/client';
import { CommsTestWidget } from "../../components/CommsTestWidget";
import { TextClippingEditor } from "../../views/TextClippingEditor";
import type { TextClipping } from "../../storage/db.types";
import { SidebarRouterProvider } from "./sidebar.routerProvider";

// Render your React component instead
const rootElem = document.getElementById('out');
if (!rootElem) {
    throw new Error('Root element not found. This is probably a programmer error.');
}
const Main = () => {
    const [clipping, setClipping] = useState<TextClipping>({
        id: '',
        title: '',
        text: ''
    });

    return (
        <SidebarRouterProvider />
    )
}

const root = createRoot(rootElem);
root.render(<Main />);

