import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../storage/db";

export const useAllChatSessions = () => {
    const x = useLiveQuery(() => db.chatSessions.toArray(), []);
    return x || [];
}

export const useChatSessionById = (id: string | undefined) => {
    const getChatSession = async () => {
        return id ? db.chatSessions.get(id) : undefined;
    }
    return useLiveQuery(getChatSession, [id]);
}