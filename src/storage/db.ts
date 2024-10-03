import Dexie, { type EntityTable } from 'dexie';
import type { ClickEntity, TextClipping } from './storage.types';

const db = new Dexie('site-chat-rag') as Dexie & {
    clicks: EntityTable<ClickEntity>,
    textClippings: EntityTable<TextClipping>
};

db.version(1).stores({
    clicks: '++id, source, timestamp', // Primary key and indexed props
    textClippings: '++id, title, text'
});

export { db }