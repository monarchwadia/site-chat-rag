import React from "react";
import type { FC, MouseEventHandler } from "react";
import { db } from "../storage/db";
import { v4 } from "uuid";
import { useLiveQuery } from "dexie-react-hooks";
import { useCurrentTabInfo } from "../hooks/useCurrentTabInfo";

type Props = {
    label: string
}
export const CommsTestWidget: FC<Props> = ({ label }) => {
    const clicks = useLiveQuery(() => db.clicks.toArray());
    const tabInfo = useCurrentTabInfo();

    const onSendMessage: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        db.clicks.add({
            id: v4(),
            source: label,
            timestamp: Date.now()
        });

        alert('about to send zap');
        chrome.tabs.sendMessage(tabInfo.tabId, { type: 'zap' });
    }

    return (
        <div>
            <h1>{label}</h1>
            <button className="btn btn-info" onClick={onSendMessage}>Zap</button>
            <div>
                {clicks?.map(click => (
                    <div key={click.id}>
                        <p>{click.source}'s button triggered at {click.timestamp}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}