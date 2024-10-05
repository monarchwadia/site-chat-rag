import { useEffect, useMemo, useState } from "react"

type UsePromiseResultReturn<T = any> =
    | {
        status: "pending"
    }
    | {
        status: "resolved",
        result: T
    }
    | {
        status: "rejected",
        friendlyMessage: string,
        error: any
    }

type UsePromiseResultOptions = {
    friendlyMessage?: string
}

export const usePromiseResult = <T>(promise: Promise<T>, depsList: any[], opts: UsePromiseResultOptions = {}): UsePromiseResultReturn<T> => {
    const { friendlyMessage = "An error occurred." } = opts
    const [status, setStatus] = useState<UsePromiseResultReturn['status']>("pending")
    const [result, setResult] = useState<T | undefined>(undefined)
    const [error, setError] = useState<any | undefined>(undefined)

    useEffect(() => {
        promise.then((result) => {
            setStatus("resolved")
            setError(undefined)
            setResult(result)
        }).catch((error) => {
            setStatus("rejected")
            setResult(undefined)
            setError(error)
        })
    }, [...depsList])

    switch (status) {
        case "pending":
            return {
                status: "pending"
            }
        case "resolved":
            return {
                status: "resolved",
                result: result as T
            }
        case "rejected":
            return {
                status: "rejected",
                friendlyMessage,
                error
            }
        default:
            throw new Error("Invalid status " + status + " in usePromiseResult. This should never happen.")
    }
}