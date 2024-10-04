import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../storage/db";
import { SidebarPageWrapper } from "../components/SidebarPageWrapper";
import { CreateClippingsForm, type TextClippingsFormSubmitValue } from "../components/CreateClippingsForm";
import { createTextClipping } from "../../../storage/textClippings.dao";
import { useNavigate } from 'react-router-dom';
import { liveQuery } from "dexie";


export const SidebarClippingsViewPage: React.FC = () => {
    const { textClippingId } = useParams();
    const clipping = useLiveQuery(() => db.textClippings.get({ 'id': textClippingId }));

    return (
        <SidebarPageWrapper pageTitle="Create Clipping">
            <div className="flex flex-col">
                {clipping && JSON.stringify(clipping)}
                {!clipping && <p>Clipping not found</p>}
            </div>
        </SidebarPageWrapper>
    )
}