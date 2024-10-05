import { Chat } from "ragged";
import type { Message } from "ragged";
import { useEffect, useMemo, useState } from "react";
import type { AiConnection, ChatSession } from "../storage/storage.types";

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
        if (status !== "idle") {
            return;
        }

        const newMessages: Message[] = [...messages, {
            type: "user",
            text: m
        }]

        setIsBusy(true);
        const { history } = await c.chat(m);
        setMessages([...newMessages, ...history]);
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