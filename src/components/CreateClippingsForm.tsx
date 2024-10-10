import React, { type FormEventHandler } from "react";

export type TextClippingsFormSubmitValue = {
    title: string;
    text: string;
}

type Props = React.PropsWithChildren<{
    onSubmit: (value: TextClippingsFormSubmitValue) => void;
}>;

export const CreateClippingsForm: React.FC<Props> = ({ onSubmit }) => {
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const title = (e.currentTarget[0] as HTMLInputElement).value;
        const text = (e.currentTarget[1] as HTMLInputElement).value;

        onSubmit({ title, text });
    }
    return (
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            <input type="text" className="input input-bordered" id="title" name="title" placeholder="Title" />
            <textarea
                className="textarea textarea-bordered"
                id="text"
                name="text"
                placeholder="Contents"
                rows={10}
                cols={50}
            />
            <button type="submit" className="btn">Create</button>
        </form>
    )
}