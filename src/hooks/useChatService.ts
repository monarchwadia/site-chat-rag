import { Chat } from "ragged";
import type { Message } from "ragged";
import { useEffect, useMemo, useState } from "react";
import type { AiConnection, ChatSession } from "../storage/db.types";
import { db } from "../storage/db";
import { createChatSession, updateChatSession } from "../storage/chatSession.dao";
import { useLiveQuery } from "dexie-react-hooks";
import { useAiConnectionsManager } from "./useDbAiConnections";
import { useChatSessionById } from "./useDbChatSessions";
import { useAppSettings } from "./useAppSettings";

type ChatSessionStatus = "idle" | "disabledNoChatSession" | "disabledBusy";

type UseChatSessionOpts = {
    aiConnectionId?: string,
    chatSessionId?: string;
}
export const useChatService = (opts: UseChatSessionOpts) => {
    const { aiConnectionId, chatSessionId } = opts;
    const { pinnedChatSessionId, setPinnedChatSessionId } = useAppSettings();
    const { useAiConnectionById } = useAiConnectionsManager();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isBusy, setIsBusy] = useState(false);

    const chatSession = useChatSessionById(chatSessionId || pinnedChatSessionId);
    const aiConnection = useAiConnectionById(aiConnectionId);
    const clippings = useLiveQuery(() => db.textClippings.toArray() || []);

    useEffect(() => {
        if (chatSession) {
            setMessages(chatSession.messages);
        } else {
            setMessages([]);
        }
    }, [chatSession?.id]);

    let status: ChatSessionStatus;
    if (!aiConnection?.id) {
        status = "disabledNoChatSession";
    } else if (isBusy) {
        status = "disabledBusy";
    } else {
        status = "idle";
    }

    const handleChat = async (m: string) => {
        if (status !== "idle" || !aiConnection) {
            return;
        }

        const c = Chat.with({
            provider: aiConnection?.provider || "openai",
            config: aiConnection?.credentialsJson
        });

        // generate clippings context
        let clippingsContext = ''
        if (clippings?.length) {
            clippingsContext += 'The following are clippings from the user\'s library. You can use these to generate responses.\n'
            clippings.forEach((clipping) => {
                clippingsContext += '--------------------------------\n'
                clippingsContext += ('# Title: ' + clipping.title || '<No title provided>') + '\n\n'
                clippingsContext += clipping.text + '\n\n'
            });
            clippingsContext += '--------------------------------\n'
        } else {
            clippingsContext = 'No clippings were added.'
        }

        // these get saved later on
        const messagesClone: Message[] = [...messages, {
            type: "user",
            text: m
        }]

        c.history = [
            {
                type: "system",
                text: clippingsContext
            },
            ...messagesClone
        ]

        setIsBusy(true);
        const { history: newMessages } = await c.chat();

        setMessages(newMessages);
        if (chatSession?.id) {
            await updateChatSession(chatSession.id, { messages: newMessages, lastUsedAiConnectionId: aiConnection.id });
        } else {
            const newChatSession = await createChatSession({
                lastUsedAiConnectionId: aiConnection.id,
                messages: newMessages
            })
            await setPinnedChatSessionId(newChatSession.id);
        }
        setIsBusy(false);
    }

    return {
        messages,
        status,
        isSendDisabled: status !== "idle",
        pinChatSessionById: async (id: string) => {
            return setPinnedChatSessionId(id);
        },
        sendMessage: (m: string) => {
            handleChat(m);
        }
    }
}