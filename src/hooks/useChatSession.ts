import type { Message } from "ragged";

type ChatSession = {
    messages: Message[];
}

export const useChatSession = (): ChatSession => {
    return {
        messages: [
            {
                type: "user",
                "text": "Hi there!"
            },
            {
                type: "bot",
                "text": "Hello, how can I help you?"
            }
        ]
    }
}