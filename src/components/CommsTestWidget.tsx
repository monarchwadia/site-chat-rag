import React from "react";
import type { FC, MouseEventHandler } from "react";

type Props = {
    label: string
}
export const CommsTestWidget: FC<Props> = ({ label }) => {

    const onSendMessage: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        alert("OK")
    }

    return (
        <div>
            <h1>{label}</h1>
            <button className="btn btn-info" onClick={onSendMessage}>Send Message</button>
        </div>
    )
}