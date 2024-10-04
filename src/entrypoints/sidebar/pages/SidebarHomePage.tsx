import React from "react";
import { Link } from "react-router-dom";

export const SidebarHomePage: React.FC = () => {
    return (
        <div className="flex flex-col">
            <h1>Sidebar Home</h1>
            <Link className="card card-bordered" to="/clippings-explorer">
                <div className="card-body">
                    Clippings
                </div>
            </Link>
        </div>
    )
}