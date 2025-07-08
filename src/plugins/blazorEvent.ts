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

    // Derived state
    const doubleCounter = computed(() => counterValue.value * 2)

    // Bridge init
    const initializeEventBridge = (): void => {
        window.blazorEventBridge = {
            onPropertyChanged: (eventDataJson: string): void => {
                try {
                    const eventData: EventData = JSON.parse(eventDataJson)
                    console.log('[Blazor Event]', eventData)

                    if (eventData.Service === 'Counter' && eventData.Property === 'Value') {
                        counterValue.value = Number(eventData.Value)
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
        try {
            const response = await window.DotNet.invokeMethodAsync(
                'BlazorMaui.Core',
                'SubscribeToService',
                serviceName
            )

            const result: SubscribeResult = JSON.parse(response)
            if (result.Success) {
                console.log(`✅ Subscribed to ${serviceName}`)
                console.log(result)
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
