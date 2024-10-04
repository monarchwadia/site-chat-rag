import React from "react";
import { RouterProvider, createMemoryRouter, type RouteObject } from "react-router-dom";
import { SidebarHomePage } from "./pages/SidebarHomePage";
import { SidebarClippingsExplorerPage } from "./pages/SidebarClippingsExplorerPage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <SidebarHomePage />
    },
    {
        path: "/clippings-explorer",
        element: <SidebarClippingsExplorerPage />
    }
]

const sidebarRouter = createMemoryRouter(routes, { initialEntries: ["/clippings-explorer"] });
export const SidebarRouterProvider = () => <RouterProvider router={sidebarRouter} />;