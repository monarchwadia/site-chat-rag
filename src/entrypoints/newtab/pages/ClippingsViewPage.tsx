import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../storage/db";
import { NewtabPageWrapper } from "../components/NewtabPageWrapper";


export const ClippingsViewPage: React.FC = () => {
    const { textClippingId } = useParams();
    const clipping = useLiveQuery(() => db.textClippings.get({ 'id': textClippingId }));

    return (
        <NewtabPageWrapper pageTitle="Create Clipping">
            <div className="flex flex-col">
                {clipping && JSON.stringify(clipping)}
                {!clipping && <p>Clipping not found</p>}
            </div>
        </NewtabPageWrapper>
    )
}