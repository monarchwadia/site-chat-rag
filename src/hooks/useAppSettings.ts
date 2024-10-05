import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../storage/db";
import { SETTINGKEY_DEFAULT_AI_CONNECTION_ID, SETTINGKEY_PINNED_CHAT_SESSION_ID } from "../constants";
import { useMemo } from "react";

export const useAppSettings = () => {
    const settings = useLiveQuery(() => db.appSettings.toArray(), []);
    const defaultAiConnectionId = settings?.find((setting) => setting.key === SETTINGKEY_DEFAULT_AI_CONNECTION_ID)?.value as string || undefined;
    const pinnedChatSessionId = settings?.find((setting) => setting.key === SETTINGKEY_PINNED_CHAT_SESSION_ID)?.value as string || undefined;

    const setDefaultAiConnectionId = async (id: string) => {
        await db.appSettings.put({ key: SETTINGKEY_DEFAULT_AI_CONNECTION_ID, value: id });
    }

    const deleteDefaultAiConnectionId = async () => {
        await db.appSettings.delete(SETTINGKEY_DEFAULT_AI_CONNECTION_ID);
    }

    const setPinnedChatSessionId = async (id: string) => {
        await db.appSettings.put({ key: SETTINGKEY_PINNED_CHAT_SESSION_ID, value: id });
    }

    const obj = useMemo(() => {
        return {
            defaultAiConnectionId,
            setDefaultAiConnectionId,
            deleteDefaultAiConnectionId,
            pinnedChatSessionId,
            setPinnedChatSessionId

        }
    }, [defaultAiConnectionId, pinnedChatSessionId]);

    return obj;
}