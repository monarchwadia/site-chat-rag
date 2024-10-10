import React from "react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { NewtabHomepage } from "./pages/NewtabHomepage";
import type { RouteObject } from "react-router-dom";
// import { SidebarClippingsExplorerPage } from "./pages/SidebarClippingsExplorerPage";
// import { SidebarClippingsCreatePage } from "./pages/SidebarClippingsCreatePage";
// import { SidebarClippingsViewPage } from "./pages/SidebarClippingsViewPage";
// import { SidebarChatPage } from "./pages/SidebarChatPage";
// import { SettingsPage } from "./pages/SettingsPage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <NewtabHomepage />
    },
]

const newtabRouter = createMemoryRouter(routes, { initialEntries: ["/"] });
export const NewtabRouterProvider = () => <RouterProvider router={newtabRouter} />;