import Dexie, { type EntityTable } from 'dexie';
import type { AiConnection, ClickEntity, AppSetting, TextClipping } from './storage.types';

const db = new Dexie('site-chat-rag') as Dexie & {
    clicks: EntityTable<ClickEntity, 'id'>,
    textClippings: EntityTable<TextClipping, 'id'>,
    aiConnections: EntityTable<AiConnection, 'id'>,
    appSettings: EntityTable<AppSetting, 'key'>
};

db.version(1).stores({
    clicks: '++id, source, timestamp', // Primary key and indexed props
    textClippings: 'id, title, text',
    aiConnections: 'id, title, provider, credentialsJson',
    appSettings: 'key, value'
});

export { db }