import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../storage/db";

export const useChatSessions = () => {
    const x = useLiveQuery(() => db.chatSessions.toArray(), []);
    return x || [];
}