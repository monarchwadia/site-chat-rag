import React from "react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { NewtabHomepage } from "./pages/NewtabHomepage";
import type { RouteObject } from "react-router-dom";
// import { SidebarClippingsExplorerPage } from "./pages/SidebarClippingsExplorerPage";
// import { SidebarClippingsCreatePage } from "./pages/SidebarClippingsCreatePage";
// import { SidebarClippingsViewPage } from "./pages/SidebarClippingsViewPage";
// import { SidebarChatPage } from "./pages/SidebarChatPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ClippingsCreatePage } from "./pages/ClippingsCreatePage";
import { ClippingsViewPage } from "./pages/ClippingsViewPage";
import { ClippingsExplorerPage } from "./pages/ClippingsExplorerPage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <NewtabHomepage />
    },
    {
        path: "/settings",
        element: <SettingsPage />
    },
    {
        path: "/clippings-explorer",
        element: <ClippingsExplorerPage />
    },
    {
        path: "/clippings-create",
        element: <ClippingsCreatePage />
    },
    {
        path: "/clippings-view/:textClippingId",
        element: <ClippingsViewPage />
    },
]

const newtabRouter = createMemoryRouter(routes, { initialEntries: ["/"] });
export const NewtabRouterProvider = () => <RouterProvider router={newtabRouter} />;