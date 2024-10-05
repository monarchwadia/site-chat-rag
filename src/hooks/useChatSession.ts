import { Chat } from "ragged";
import type { Message } from "ragged";
import { useEffect, useMemo, useState } from "react";
import type { AiConnection, ChatSession } from "../storage/storage.types";
import { db } from "../storage/db";
import { createChatSession, updateChatSession } from "../storage/chatSession.dao";
import { useLiveQuery } from "dexie-react-hooks";

type ChatSessionStatus = "idle" | "disabledNoChatSession" | "disabledBusy";

type UseChatSessionOpts = {
    aiConnection?: AiConnection,
    chatSession?: ChatSession
}
export const useChatSession = (opts: UseChatSessionOpts) => {
    const clippings = useLiveQuery(() => db.textClippings.toArray() || [])
    const { aiConnection, chatSession } = opts;
    const [messages, setMessages] = useState<Message[]>(chatSession?.messages || []);
    const [isBusy, setIsBusy] = useState(false);

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
        if (clippings) {
            clippingsContext += 'The following are clippings from the user\'s library. You can use these to generate responses.\n'
            clippings.forEach((clipping) => {
                clippingsContext += '--------------------------------\n'
                clippingsContext += '# Title: ' + clipping.title || '<No title provided>\n'
                clippingsContext += clipping.title + '\n'
            })
        } else {
            clippingsContext = 'No clippings were added.'
        }

        // these get saved later on
        const newMessages: Message[] = [...messages, {
            type: "user",
            text: m
        }]

        c.history = [
            {
                type: "system",
                text: clippingsContext
            },
            ...newMessages
        ]



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