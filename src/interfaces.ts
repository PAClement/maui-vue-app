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
export interface Product {
    Name: string;
    Plu?: string;
    InternalRef?: string;
    FkDepartment?: number;
    FkCategory?: number;
    FkFamily?: number;
    FkSubFamily?: number;
    FkVat: number;
    Price: number;
    PurchasingPrice: number;
    FkAccountingCode: number;
    IsManagedInStock: boolean;
    FkStock?: number;
    IsWeighed: boolean;
    IsMenu: boolean;
    IsEligibleLunchVoucher: boolean;
    IsNegativePrice: boolean;
    AgeRestrictions: boolean;
    FkSupplier: number;
    IsInactive: boolean;
    FkUnit: number;
    Capacity?: number;
    Tare?: number;
    ConsumptionDeadline?: number;
    SecondaryFeatures?: SecondaryFeatures;
}

export interface SecondaryFeatures {
    Origin?: string;
    Variety?: string;
    SizeCode?: string;
    ScientificName?: string;
    ShortDescription?: string;
    Description?: string;
    Ingredients?: string;
    Allergens?: string[];
}

export interface CustomerBasketInformation{
    totalBasketAmount: number;
    totalBasketQuantity: number;
}

export interface Alert {
    Title: string;
    Message: string;
    Type: string;
    Timestamp: Date;
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
    IsAvailable: boolean;
    Version?: string;
    Error?: string;
}