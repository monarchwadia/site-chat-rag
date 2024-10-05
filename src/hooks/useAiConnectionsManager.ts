import { useMemo } from "react"
import { db } from "../storage/db"
import type { AiConnection } from "../storage/db.types"
import { v4 } from "uuid"
import { useLiveQuery } from "dexie-react-hooks"
import { useAppSettings } from "./useAppSettings"

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

    const defaultAiConnection = allAiConnections?.find((aiConnection) => aiConnection.id === defaultAiConnectionId);

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
            defaultAiConnection,
            setDefaultAiConnection: async (id: string) => {
                await setDefaultAiConnectionId(id);
            },
            getAiConnectionById: async () => {
                // TODO
            },
            updateAiConnection: async () => {
                // TODO
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
            listAllAiConnections: () => {
                return {
                    connections: allAiConnections || [],
                    defaultConnection: defaultAiConnection
                }
            }
        }
    }, [allAiConnections, defaultAiConnectionId, defaultAiConnection])

    return obj;
}