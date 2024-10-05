import { Chat } from "ragged";
import type { Message } from "ragged";
import { useEffect, useMemo, useState } from "react";
import type { AiConnection, ChatSession } from "../storage/storage.types";
import { db } from "../storage/db";
import { createChatSession, updateChatSession } from "../storage/chatSession.dao";

type ChatSessionStatus = "idle" | "disabledNoChatSession" | "disabledBusy";

const c = Chat.with({
    provider: "openai",
    config: {
        apiKey: "sk-1234567890abcdef1234567890abcdef"
    }
})

type UseChatSessionOpts = {
    aiConnection?: AiConnection,
    chatSession?: ChatSession
}
export const useChatSession = (opts: UseChatSessionOpts) => {
    const { aiConnection, chatSession } = opts;

    const [messages, setMessages] = useState<Message[]>(chatSession?.messages || []);
    const [isBusy, setIsBusy] = useState(false);

    const c = useMemo(() => {
        if (aiConnection == null) {
            return null;
        }

        const newC = Chat.with({
            provider: aiConnection?.provider || "openai",
            config: aiConnection?.credentialsJson
        });

        newC.record(false); // we are manually managing this

        if (chatSession) {
            newC.history = chatSession.messages;
        }

        return newC;
    }, [aiConnection, chatSession?.id]);

    useEffect(() => {
        if (chatSession) {
            setMessages(chatSession.messages);
        } else {
            setMessages([]);
        }
    }, [chatSession?.id]);

    let status: ChatSessionStatus;
    if (!c) {
        status = "disabledNoChatSession";
    } else if (isBusy) {
        status = "disabledBusy";
    } else {
        status = "idle";
    }

    const handleChat = async (m: string) => {
        if (status !== "idle" || !c || !aiConnection) {
            return;
        }

        const newMessages: Message[] = [...messages, {
            type: "user",
            text: m
        }]

        setIsBusy(true);
        const { history } = await c.chat(m);
        const newHistory = [...newMessages, ...history];
        if (chatSession?.id) {
            updateChatSession(chatSession.id, { messages: newHistory, lastUsedAiConnectionId: aiConnection.id });
        } else {
            // const newId = await db.chatSessions.add({
            //     messages: newHistory,
            //     lastUsedAiConnectionId: aiConnection?.id,

            // });
            await createChatSession({
                lastUsedAiConnectionId: aiConnection.id,
                messages: newHistory
            })
            setMessages(newHistory);
        }
        setMessages(newHistory);
        setIsBusy(false);
    }

    return {
        messages,
        status,
        isSendDisabled: status !== "idle",
        sendMessage: (m: string) => {
            handleChat(m);
        }
    }
}