import React from "react";
import type { FC, MouseEventHandler } from "react";
import { db } from "../storage/db";
import { v4 } from "uuid";
import { useLiveQuery } from "dexie-react-hooks";

type Props = {
    label: string
}
export const CommsTestWidget: FC<Props> = ({ label }) => {
    const clicks = useLiveQuery(() => db.clicks.toArray());

    const onSendMessage: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        db.clicks.add({
            id: v4(),
            source: label,
            timestamp: Date.now()
        })
    }

    return (
        <div>
            <h1>{label}</h1>
            <button className="btn btn-info" onClick={onSendMessage}>IncrementCounter</button>
            <div>
                {clicks?.map(click => (
                    <div key={click.id}>
                        <p>{click.source} clicked at {click.timestamp}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}