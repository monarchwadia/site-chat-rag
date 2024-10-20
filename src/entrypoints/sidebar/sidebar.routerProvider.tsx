import React from "react";
import { RouterProvider, createMemoryRouter, type RouteObject } from "react-router-dom";
import { SidebarRoutesWrapper } from "./components/SidebarRoutesWrapper";
import { SidebarHomePage } from "./pages/SidebarHomePage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <SidebarRoutesWrapper />,
        children: [
            {
                path: "/",
                element: <SidebarHomePage />,
            }
        ]
    }
]

const sidebarRouter = createMemoryRouter(routes, { initialEntries: ["/"] });
export const SidebarRouterProvider = () => <RouterProvider router={sidebarRouter} />;
