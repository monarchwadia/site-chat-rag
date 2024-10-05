import { useMemo } from "react"
import { db } from "../storage/db"
import type { AiConnection } from "../storage/storage.types"
import { v4 } from "uuid"
import { useLiveQuery } from "dexie-react-hooks"
import { SETTINGKEY_DEFAULT_AI_CONNECTION_ID } from "../constants"

/**
 * This AiConnectionManager uses Dexie to CRUDL the various AI connections.
 * it exposes methods to create, read, update, delete, and list the connections.
 */
export const useAiConnectionsManager = () => {
    const allAiConnections = useLiveQuery(() => db.aiConnections.toArray(), [])
    const defaultAiConnectionId = useLiveQuery(() => db.appSettings.get(SETTINGKEY_DEFAULT_AI_CONNECTION_ID), [])
    const defaultAiConnection = allAiConnections?.find((aiConnection) => aiConnection.id === defaultAiConnectionId?.value);

    const obj = useMemo(() => {
        return {
            createAiConnection: async (aiConnection: Pick<AiConnection, 'title' | 'credentialsJson' | 'provider'>) => {
                const id = v4();
                const count = await db.aiConnections.count();
                if (count === 0) {
                    await db.appSettings.put({ key: SETTINGKEY_DEFAULT_AI_CONNECTION_ID, value: id });
                }
                const newId = await db.aiConnections.add({ id, ...aiConnection });
                return newId;
            },
            getDefaultAiConnection: async () => {
                return defaultAiConnection;
            },
            getAiConnectionById: async () => {
                // TODO
            },
            updateAiConnection: async () => {
                // TODO
            },
            deleteAiConnection: async (id: string) => {
                let defaultWasDeleted = false;
                if (defaultAiConnectionId?.value === id) {
                    // await db.appSettings.delete(SETTINGKEY_DEFAULT_AI_CONNECTION_ID);
                    defaultWasDeleted = true;
                }

                const deletedId = await db.aiConnections.delete(id);

                if (defaultWasDeleted) {
                    const newDefault = allAiConnections?.find((aiConnection) => aiConnection.id !== id);
                    if (newDefault) {
                        await db.appSettings.put({ key: SETTINGKEY_DEFAULT_AI_CONNECTION_ID, value: newDefault.id });
                    } else {
                        await db.appSettings.delete(SETTINGKEY_DEFAULT_AI_CONNECTION_ID);
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