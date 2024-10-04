import React from "react";
import { RouterProvider, createMemoryRouter, type RouteObject } from "react-router-dom";
import { SidebarHomePage } from "./pages/SidebarHomePage";
import { SidebarClippingsExplorerPage } from "./pages/SidebarClippingsExplorerPage";
import { SidebarClippingsCreatePage } from "./pages/SidebarClippingsCreatePage";
import { SidebarClippingsViewPage } from "./pages/SidebarClippingsViewPage";

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
    }
]

const sidebarRouter = createMemoryRouter(routes, { initialEntries: ["/clippings-explorer"] });
export const SidebarRouterProvider = () => <RouterProvider router={sidebarRouter} />;