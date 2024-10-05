import React from "react";
import { useAiConnectionsManager } from "../../../hooks/useAiConnectionsManager";
import { AiConnectionForm } from "./AiConnectionForm";

type Props = React.PropsWithChildren<{

}>;

export const AiConnectionSettings: React.FC<Props> = ({ }) => {
    const { createAiConnection, listAllAiConnections, deleteAiConnection } = useAiConnectionsManager();

    const aiConnections = listAllAiConnections() || [];

    const handleCreateAiConnection = async (newAiConnection: { title: string, provider: "openai", apiKey: string }) => {
        await createAiConnection({
            title: newAiConnection.title,
            provider: "openai",
            credentialsJson: {
                apiKey: newAiConnection.apiKey
            }
        });
    }

    const handleDeleteAiConnection = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault();
        confirm("Are you sure you want to delete this AI connection?") && await deleteAiConnection(id);
    }

    return (
        <div className="flex flex-col">
            <AiConnectionForm onSubmit={handleCreateAiConnection} />
            {
                aiConnections.map((aiConnection) => {
                    return (
                        <div key={aiConnection.id} className="card card-bordered">
                            <div className="card-body">
                                <div className="card-title">{aiConnection.title}</div>
                                <div><span className="font-bold">Provider: </span><span className="badge badge-neutral">{aiConnection.provider}</span></div>
                                <button onClick={(e) => handleDeleteAiConnection(e, aiConnection.id)} className="btn btn-error w-fit btn-sm">Delete</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}