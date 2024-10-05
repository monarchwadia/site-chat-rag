import { useMemo, useState } from "react"
import { db } from "../storage/db"
import type { AiConnection } from "../storage/db.types"
import { v4 } from "uuid"
import { useLiveQuery } from "dexie-react-hooks"
import { useAppSettings } from "./useAppSettings"
import { usePromiseResult } from "./usePromiseResult"

/**
 * This AiConnectionManager uses Dexie to CRUDL the various AI connections.
 * it exposes methods to create, read, update, delete, and list the connections.
 */
export const useAiConnectionsManager = () => {
    const allAiConnections = useLiveQuery(() => db.aiConnections.toArray(), [])
    const {
        defaultAiConnectionId,
        setDefaultAiConnectionId,
        deleteDefaultAiConnectionId,
        lastChatSessionId,
        setLastChatSessionId
    } = useAppSettings();

    const obj = useMemo(() => {
        return {
            createAiConnection: async (aiConnection: Pick<AiConnection, 'title' | 'credentialsJson' | 'provider'>) => {
                const id = v4();
                const count = await db.aiConnections.count();
                if (count === 0) {
                    await setDefaultAiConnectionId(id);
                }
                const newId = await db.aiConnections.add({ id, ...aiConnection });
                return newId;
            },
            setDefaultAiConnection: async (id: string) => {
                await setDefaultAiConnectionId(id);
            },
            deleteAiConnection: async (id: string) => {
                let defaultWasDeleted = false;
                if (defaultAiConnectionId === id) {
                    defaultWasDeleted = true;
                }

                const deletedId = await db.aiConnections.delete(id);

                if (defaultWasDeleted) {
                    const newDefault = allAiConnections?.find((aiConnection) => aiConnection.id !== id);
                    if (newDefault) {
                        await setDefaultAiConnectionId(newDefault.id);
                    } else {
                        await deleteDefaultAiConnectionId();
                    }
                }

                return deletedId;
            },
            useAiConnectionById: (id: string) => {
                return usePromiseResult(db.aiConnections.get(id), [id]);
            },
            useListAllAiConnections: () => {
                const aiConnections = useLiveQuery(() => db.aiConnections.toArray(), []);

                return aiConnections || [];
            },
            useDefaultAiConnection: () => {
                const getDefaultAiConnection = async () => {
                    if (!defaultAiConnectionId) {
                        return undefined;
                    }

                    return db.aiConnections.get(defaultAiConnectionId);
                }

                const promise = useMemo(() => {
                    return getDefaultAiConnection();
                }, [defaultAiConnectionId])

                return usePromiseResult(promise, [defaultAiConnectionId]);
            }
        }
    }, [allAiConnections, defaultAiConnectionId])

    return obj;
}
