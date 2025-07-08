declare global {
    interface Window {
        blazorEventBridge: {
            onPropertyChanged: (eventDataJson: string) => void
        }
        JsDotNet: {
            invokeMethodAsync: (
                assemblyName: string,
                methodIdentifier: string,
                ...args: unknown[]
            ) => Promise<string>
        }
    }
}

/*Interface UI*/
export interface ButtonConfig {
    text: string
    icon: string
    bgColor: string
    iconColor?: string
    iconSide?: string
    disabled?: boolean
    action: 'next' | 'prev' | 'custom'
}

/*Interface Blazor*/
export interface EventData {
    Service: string
    Property: string
    Value: unknown
}

export interface SubscribeResult {
    Success: boolean
    Error?: string
}

export interface BlazorInitResult {
    isAvailable: boolean;
    version?: string;
    error?: string;
}