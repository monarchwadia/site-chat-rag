import { v4 } from "uuid";
import { db } from "./db";
import type { ChatSession, TextClipping } from "./storage.types";
import type { Message } from "ragged";

type CreateChatSessionArgs = {
    title?: string;
    messages?: Message[];
    lastUsedAiConnectionId?: string;
}
export const createChatSession = async (args: CreateChatSessionArgs) => {
    let { title, messages = [], lastUsedAiConnectionId } = args;

    const newChatSession: ChatSession = {
        id: v4(),
        title,
        lastUsedAiConnectionId,
        messages
    }
    await db.chatSessions.add(newChatSession);
    return newChatSession;
}

export const updateChatSession = async (id: string, updates: Partial<ChatSession>) => {
    await db.chatSessions.update(id, updates);
}

export const listChatSessions = async () => {
    return db.chatSessions.toArray();
}