import React from "react";
import { RouterProvider, createMemoryRouter, type RouteObject } from "react-router-dom";
import { SidebarHomePage } from "./pages/SidebarHomePage";
import { SidebarChatPage } from "./pages/SidebarChatPage";
import { SidebarRoutesWrapper } from "./components/SidebarRoutesWrapper";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <SidebarRoutesWrapper />,
        children: [
            {
                path: "/",
                element: <SidebarHomePage />,
            },
            {
                path: "/chat",
                element: <SidebarChatPage />
            }
        ]
    }
]

const sidebarRouter = createMemoryRouter(routes, { initialEntries: ["/"] });
export const SidebarRouterProvider = () => <RouterProvider router={sidebarRouter} />;
