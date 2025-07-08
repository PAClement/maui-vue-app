import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { BlazorBridge } from '@/plugins/blazorBridge'

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

// Interfaces
interface EventData {
    Service: string
    Property: string
    Value: unknown
}

interface SubscribeResult {
    Success: boolean
    Error?: string
}

interface BlazorResult<T = unknown> {
    success: boolean
    data?: T
    error?: string
}

export const useBlazorStore = defineStore('blazor', () => {
    // Example state (Counter)
    const counterValue = ref<number>(0)
    const isConnected = ref<boolean>(false)
    console.log('Blazor store initialized')
    // Derived state
    const doubleCounter = computed(() => counterValue.value * 2)

    // Bridge init
    const initializeEventBridge = (): void => {
        console.log('Initializing Blazor event bridge...')

        window.blazorEventBridge = {
            onPropertyChanged: (eventDataJson: string): void => {
                console.log('[Blazor Event Bridge] Received event data:', eventDataJson)
                try {
                    const eventData: EventData = JSON.parse(eventDataJson)
                    console.log('[Blazor Event]', eventData)

                    if (eventData.Service === 'System') {
                        switch (eventData.Property){
                            case 'Value':
                                console.log(`Counter value changed: ${eventData.Value}`)
                                counterValue.value = Number(eventData.Value)
                                break;
                            case 'Alert':
                                console.log(`Alert from Blazor: ${eventData.Value}`)
                                break;
                        }

                    }

                    // Tu peux ajouter d'autres cas ici
                } catch (error) {
                    console.error('Invalid Blazor event data:', error)
                }
            }
        }

        isConnected.value = true
    }

    /**
     * Subscribe to a given C# service (e.g. 'Counter', 'User', etc.)
     * @param serviceName - Name of the service to subscribe
     */
    const subscribeToService = async (serviceName: string): Promise<boolean> => {
        console.log('on service')
        try {
            const response = await (window as any).DotNet.invokeMethodAsync(
                'BlazorMaui.Core',
                'SubscribeToService',
                serviceName
            )

            const result: SubscribeResult = JSON.parse(response)
            if (result.Success) {
                console.log(`✅ Subscribed to ${serviceName}`)
                return true
            } else {
                console.error(`❌ Failed to subscribe to ${serviceName}:`, result.Error)
                return false
            }
        } catch (error) {
            console.error(`Error subscribing to ${serviceName}:`, error)
            return false
        }
    }

    return {
        // State
        counterValue,
        isConnected,

        // Getters
        doubleCounter,

        // Blazor bridge
        initializeEventBridge,
        subscribeToService,
    }
})
