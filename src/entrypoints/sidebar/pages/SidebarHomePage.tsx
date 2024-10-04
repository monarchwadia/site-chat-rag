import React from "react";
import { Link } from "react-router-dom";
import { SidebarPageWrapper } from "../components/SidebarPageWrapper";

export const SidebarHomePage: React.FC = () => {
    return (
        <div className="flex flex-col">
            <SidebarPageWrapper pageTitle="Sidebar Home" hideNavigationBar={true} >
                <Link className="card card-bordered" to="/clippings-explorer">
                    <div className="card-body">
                        Clippings
                    </div>
                </Link>
                <Link className="card card-bordered" to="/chat-main">
                    <div className="card-body">
                        Chat
                    </div>
                </Link>
            </SidebarPageWrapper>
        </div>
    )
}