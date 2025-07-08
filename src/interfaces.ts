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
    name: string;
    plu?: string;
    internalRef?: string;
    fkDepartment?: number;
    fkCategory?: number;
    fkFamily?: number;
    fkSubFamily?: number;
    fkVat: number;
    price: number;
    purchasingPrice: number;
    fkAccountingCode: number;
    isManagedInStock: boolean;
    fkStock?: number;
    isWeighed: boolean;
    isMenu: boolean;
    isEligibleLunchVoucher: boolean;
    isNegativePrice: boolean;
    ageRestrictions: boolean;
    fkSupplier: number;
    isInactive: boolean;
    fkUnit: number;
    capacity?: number;
    tare?: number;
    consumptionDeadline?: number;
    secondaryFeatures?: SecondaryFeatures;
}

interface SecondaryFeatures {
    origin?: string;
    variety?: string;
    sizeCode?: string;
    scientificName?: string;
    shortDescription?: string;
    description?: string;
    ingredients?: string;
    allergens?: string[];
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