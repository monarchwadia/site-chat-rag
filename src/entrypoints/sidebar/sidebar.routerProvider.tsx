import React from "react";
import { RouterProvider, createMemoryRouter, type RouteObject } from "react-router-dom";
import { SidebarHomePage } from "./pages/SidebarHomePage";
import { SidebarClippingsExplorerPage } from "./pages/SidebarClippingsExplorerPage";
import { SidebarClippingsCreatePage } from "./pages/SidebarClippingsCreatePage";
import { SidebarClippingsViewPage } from "./pages/SidebarClippingsViewPage";
import { SidebarChatPage } from "./pages/SidebarChatPage";
import { SettingsPage } from "./pages/SettingsPage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <SidebarHomePage />
    },
    {
        path: "/clippings-explorer",
        element: <SidebarClippingsExplorerPage />
    },
    {
        path: "/clippings-create",
        element: <SidebarClippingsCreatePage />
    },
    {
        path: "/clippings-view/:textClippingId",
        element: <SidebarClippingsViewPage />
    },
    {
        path: "/chat",
        element: <SidebarChatPage />
    },
    {
        path: "/settings",
        element: <SettingsPage />
    },
]

const sidebarRouter = createMemoryRouter(routes, { initialEntries: ["/chat"] });
export const SidebarRouterProvider = () => <RouterProvider router={sidebarRouter} />;