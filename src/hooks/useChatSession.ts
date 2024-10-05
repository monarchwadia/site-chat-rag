import { Chat } from "ragged";
import type { Message } from "ragged";
import { useEffect, useState } from "react";
import type { AiConnection } from "../storage/storage.types";

const c = Chat.with({
    provider: "openai",
    config: {
        apiKey: "sk-1234567890abcdef1234567890abcdef"
    }
})

type UseChatSessionOpts = {
    aiConnection?: AiConnection
}
export const useChatSession = (opts: UseChatSessionOpts) => {
    const { aiConnection } = opts;

    const [messages, setMessages] = useState<Message[]>([
        {
            type: "user",
            "text": "Hi there!"
        },
        {
            type: "bot",
            "text": "Hello, how can I help you?"
        }
    ]);

    return {
        messages,
        sendMessage: () => {
            alert("SENDING")
        }
    }
}