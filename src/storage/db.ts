import Dexie, { type EntityTable } from 'dexie';
import type { AiConnection, ClickEntity, AppSetting, TextClipping, ChatSession } from './db.types';

const db = new Dexie('site-chat-rag') as Dexie & {
    clicks: EntityTable<ClickEntity, 'id'>,
    textClippings: EntityTable<TextClipping, 'id'>,
    aiConnections: EntityTable<AiConnection, 'id'>,
    appSettings: EntityTable<AppSetting, 'key'>,
    chatSessions: EntityTable<ChatSession, 'id'>
};

db.version(1).stores({
    clicks: '++id', // Primary key and indexed props
    textClippings: 'id, title',
    aiConnections: 'id, title',
    appSettings: 'key',
    chatSessions: 'id'
});

export { db }