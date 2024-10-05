import React, { type FormEventHandler } from "react";

type Props = React.PropsWithChildren<{
    onSubmit: (newAiConnection: { title: string, provider: "openai", apiKey: string }) => void;
}>;

export const AiConnectionForm: React.FC<Props> = ({ onSubmit }) => {
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // TODO: Implement this
        // const provider = ((e.target as HTMLFormElement).querySelector("#provider") as HTMLSelectElement | null)?.value;
        const provider: "openai" = "openai";
        const apiKey = ((e.target as HTMLFormElement).querySelector("#apiKey") as HTMLSelectElement | null)?.value.trim();
        const title = ((e.target as HTMLFormElement).querySelector("#title") as HTMLSelectElement | null)?.value.trim();
        if (provider && apiKey && title) {
            onSubmit({ title, provider, apiKey });
        } else {
            alert("Missing title, provider or apiKey");
        }
    }
    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <input className="input input-sm input-bordered" type="text" id="title" placeholder="Title" />
            <select className="select select-sm select-bordered" id="provider">
                <option value="openai" selected={true}>OpenAI</option>
            </select>
            <input className="input input-sm input-bordered" type="text" id="apiKey" placeholder="API Key" />
            <button className="btn btn-sm  btn-info" type="submit">Create</button>
        </form>
    )
}