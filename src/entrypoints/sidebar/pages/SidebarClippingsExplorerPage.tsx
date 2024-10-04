import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import { Link } from "react-router-dom";
import { db } from "../../../storage/db";

export const SidebarClippingsExplorerPage: React.FC = () => {
    const clippings = useLiveQuery(() => db.textClippings.toArray());

    return (
        <div className="flex flex-col">
            <h1>Clippings Explorer</h1>
            <Link to="/clippings-create" className="btn btn-info">Create Clipping</Link>
            <div className="flex flex-col">
                {
                    clippings?.map(clipping => (
                        <Link to={`/clippings-view/${clipping.id}`} key={clipping.id} className="link">{clipping.title}</Link>
                    ))
                }
                {
                    !clippings?.length && <p>No clippings yet</p>
                }
            </div>
        </div>
    )
}