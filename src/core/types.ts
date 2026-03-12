export interface RemainderSettings {
    enabled: boolean;
    interval: number;
}

export interface RemainderConfig {
    id: string;
    title: string;
    defaultInterval: number;
    message: string;
}