import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import { Link } from "react-router-dom";
import { db } from "../../../storage/db";
import { SidebarPageWrapper } from "../components/SidebarPageWrapper";
import { CreateClippingsForm, type TextClippingsFormSubmitValue } from "../components/CreateClippingsForm";
import { createTextClipping } from "../../../storage/textClippings.dao";
import { useNavigate } from 'react-router-dom';


export const SidebarClippingsCreatePage: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = async (val: TextClippingsFormSubmitValue) => {
        const newClipping = await createTextClipping(val);
        navigate(`/clippings-view/${newClipping.id}`);
    }

    return (
        <SidebarPageWrapper pageTitle="Create Clipping">
            <div className="flex flex-col">
                <CreateClippingsForm onSubmit={handleSubmit} />
            </div>
        </SidebarPageWrapper>
    )
}