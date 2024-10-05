import React from "react";
import { useAiConnectionsManager } from "../../../hooks/useAiConnectionsManager";
import { AiConnectionForm } from "./AiConnectionForm";

type Props = React.PropsWithChildren<{

}>;

export const AiConnectionSettings: React.FC<Props> = ({ }) => {
    const [formIsOpen, setFormIsOpen] = React.useState(false);
    const { createAiConnection, listAllAiConnections, deleteAiConnection, setDefaultAiConnection } = useAiConnectionsManager();

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

    if (!aiConnections.connections.length) {
        return (
            <div className="flex flex-col">
                <div className="hero bg-base-200">
                    <div className="hero-content text-center flex flex-col">
                        <h1 className="text-2xl">No AI connections found.</h1>
                        <p className="text-lg">Create a new AI connection to power up this extension.</p>
                        <div className="bordered gap-4 rounded">
                            <AiConnectionForm onSubmit={handleCreateAiConnection} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            {formIsOpen
                ? <AiConnectionForm onSubmit={handleCreateAiConnection} onClose={() => setFormIsOpen(false)} />
                : <button onClick={() => setFormIsOpen(true)} className="btn btn-sm btn-success w-fit">Create New AI Connection</button>
            }
            {
                aiConnections.connections.map((aiConnection) => {
                    return (
                        <div key={aiConnection.id} className="card card-bordered">
                            <div className="card-body">
                                <div className="card-title">{aiConnection.title}</div>
                                {aiConnection.id === aiConnections.defaultConnection?.id
                                    && <span className="badge badge-success">Default</span>
                                }
                                <div><span className="font-bold">Provider: </span><span className="badge badge-neutral">{aiConnection.provider}</span></div>
                                <div className="flex flex-row gap-2">
                                    <button onClick={(e) => handleDeleteAiConnection(e, aiConnection.id)} className="btn btn-error w-fit btn-sm">Delete</button>
                                    {
                                        aiConnection.id !== aiConnections.defaultConnection?.id
                                        && <button className="btn btn-sm btn-ghost w-fit" onClick={() => setDefaultAiConnection(aiConnection.id)}>Set as Default</button>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}