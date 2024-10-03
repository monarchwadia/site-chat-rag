import Dexie, { type EntityTable } from 'dexie';
import type { ClickEntity } from './storage.types';

const db = new Dexie('site-chat-rag') as Dexie & {
    clicks: EntityTable<ClickEntity>
};

db.version(1).stores({
    clicks: '++id, source, timestamp' // Primary key and indexed props
});

export { db }