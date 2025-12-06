export interface HttpClientInterface {
    post(url: string, data: Record<string, unknown>): Promise<any>;
}

export interface HttpClientOptions {
    timeout?: number;
    retries?: number;
}
