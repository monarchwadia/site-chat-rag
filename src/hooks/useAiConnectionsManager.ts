import { useMemo } from "react"
import { db } from "../storage/db"
import type { AiConnection } from "../storage/storage.types"
import { v4 } from "uuid"
import { useLiveQuery } from "dexie-react-hooks"

/**
 * This AiConnectionManager uses Dexie to CRUDL the various AI connections.
 * it exposes methods to create, read, update, delete, and list the connections.
 */
export const useAiConnectionsManager = () => {
    const allAiConnections = useLiveQuery(() => db.aiConnections.toArray(), [])

    const obj = useMemo(() => {
        return {
            createAiConnection: async (aiConnection: Pick<AiConnection, 'title' | 'credentialsJson' | 'provider'>) => {
                const id = v4();
                return db.aiConnections.add({ id, ...aiConnection })
            },
            getAiConnectionById: async () => {
                // TODO
            },
            updateAiConnection: async () => {
                // TODO
            },
            deleteAiConnection: async (id: string) => {
                return db.aiConnections.delete(id);
            },
            listAllAiConnections: () => {
                return allAiConnections;
            }
        }
    }, [allAiConnections])

    return obj;
}