import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import { Link } from "react-router-dom";
import { db } from "../../../storage/db";
import { SidebarPageWrapper } from "../components/SidebarPageWrapper";

export const SidebarClippingsCreatePage: React.FC = () => {
    return (
        <SidebarPageWrapper pageTitle="Create Clipping">
            <div className="flex flex-col">
                Todo
            </div>
        </SidebarPageWrapper>
    )
}