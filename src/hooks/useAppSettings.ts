import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../storage/db";
import { SETTINGKEY_DEFAULT_AI_CONNECTION_ID, SETTINGKEY_LAST_CHAT_SESSION_ID } from "../constants";
import { useMemo } from "react";

export const useAppSettings = () => {
    const settings = useLiveQuery(() => db.appSettings.toArray(), []);
    const defaultAiConnectionId = settings?.find((setting) => setting.key === SETTINGKEY_DEFAULT_AI_CONNECTION_ID)?.value as string || undefined;
    const lastChatSessionId = settings?.find((setting) => setting.key === SETTINGKEY_LAST_CHAT_SESSION_ID)?.value as string || undefined;

    const setDefaultAiConnectionId = async (id: string) => {
        await db.appSettings.put({ key: SETTINGKEY_DEFAULT_AI_CONNECTION_ID, value: id });
    }

    const deleteDefaultAiConnectionId = async () => {
        await db.appSettings.delete(SETTINGKEY_DEFAULT_AI_CONNECTION_ID);
    }

    const setLastChatSessionId = async (id: string) => {
        await db.appSettings.put({ key: SETTINGKEY_LAST_CHAT_SESSION_ID, value: id });
    }

    const obj = useMemo(() => {
        return {
            defaultAiConnectionId,
            setDefaultAiConnectionId,
            deleteDefaultAiConnectionId,
            lastChatSessionId,
            setLastChatSessionId

        }
    }, [defaultAiConnectionId, lastChatSessionId]);

    return obj;
}