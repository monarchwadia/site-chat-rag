import type { Message } from "ragged";

export type TextClipping = {
    id: string;
    title: string;
    text: string;
}

export type AiConnection<T = { apiKey: string }> = {
    id: string;
    title: string;
    provider: "openai";
    credentialsJson: T;
}

export type AppSetting<T = any> = {
    key: string;
    value: T;
}

export type ChatSession = {
    id: string;
    title?: string;
    messages: Message[];
    lastUsedAiConnectionId?: string;
}
