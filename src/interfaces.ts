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

/*Interface data */
export interface Alert {
    title: string;
    message: string;
    type: string;
    timestamp: Date;
}

/*Interface Blazor*/
export interface EventData {
    service: string
    property: string
    value: unknown
}

export interface SubscribeResult {
    success: boolean
    error?: string
}

export interface BlazorInitResult {
    is_available: boolean;
    version?: string;
    error?: string;
}