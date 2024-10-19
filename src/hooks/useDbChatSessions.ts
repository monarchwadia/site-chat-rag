import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../storage/db";
import { useAppSettings } from "./useAppSettings";

export const useAllChatSessions = () => {
    const chatSessions = useLiveQuery(() => db.chatSessions.toArray(), []);
    const { pinnedChatSessionId } = useAppSettings();

    const pinnedChatSession = chatSessions?.find((session) => session.id === pinnedChatSessionId);

    return {
        chatSessions: chatSessions || [],
        pinnedChatSession
    }
}

export const useChatSessionById = (id: string | undefined) => {
    const getChatSession = async () => {
        return id ? db.chatSessions.get(id) : undefined;
    }
    return useLiveQuery(getChatSession, [id]);
}