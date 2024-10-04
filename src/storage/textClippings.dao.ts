import { v4 } from "uuid";
import { db } from "./db";
import type { TextClipping } from "./storage.types";

type CreateTextClippingArgs = {
    title: string;
    text: string;
}
export const createTextClipping = async ({ title, text }: CreateTextClippingArgs) => {
    const newClipping: TextClipping = {
        id: v4(),
        title,
        text
    }
    await db.textClippings.add(newClipping);
    return newClipping;
}