type Opts = {
    intervalMs: number;  // Time in milliseconds between retries
    maxRetries: number;  // Maximum number of retry attempts
};

export async function retry<T>(fn: () => Promise<T>, opts: Opts): Promise<T> {
    const { intervalMs, maxRetries } = opts;

    let attempts = 0;

    while (attempts < maxRetries) {
        try {
            // Attempt the function
            return await fn();
        } catch (error) {
            attempts++;
            if (attempts >= maxRetries) {
                // If max retries reached, rethrow the error
                throw error;
            }
            // Wait for the interval before the next retry
            await new Promise(resolve => setTimeout(resolve, intervalMs));
        }
    }

    // If we reach here, all retries have failed, throw an error
    throw new Error(`Failed after ${maxRetries} retries`);
}
