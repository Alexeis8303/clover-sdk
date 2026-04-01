import { AxiosResponse } from "axios"

export function getRetryDelay(
    response: AxiosResponse,
    attempt: number
): number {

    const retryAfter = response.headers["retry-after"]

    if (retryAfter) {

        const seconds = Number(retryAfter)

        if (!isNaN(seconds)) {
            return seconds * 1000
        }

    }

    // fallback exponential backoff

    return 2 ** attempt * 200
}