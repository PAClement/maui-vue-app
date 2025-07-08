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

interface EventData {
    Service: string
    Property: string
    Value: number
}

interface BlazorResult<T = unknown> {
    success: boolean
    data?: T
    error?: string
}

interface SubscribeResult {
    Success: boolean
    Error?: string
}

export const useBlazorStore = defineStore('blazor', () => {
    const counterValue = ref<number>(0)
    const isConnected = ref<boolean>(false)

    const doubleCounter = computed(() => counterValue.value * 2)

    const initializeEventBridge = (): void => {
        window.blazorEventBridge = {
            onPropertyChanged: (eventDataJson: string): void => {
                try {
                    const eventData: EventData = JSON.parse(eventDataJson)
                    console.log('Property changed:', eventData)

                    if (eventData.Service === 'Counter' && eventData.Property === 'Value') {
                        counterValue.value = eventData.Value
                    }
                } catch (error) {
                    console.error('Error handling property change:', error)
                }
            }
        }

        isConnected.value = true
    }

    const subscribeToCounter = async (): Promise<void> => {
        try {
            const response = await window.DotNet.invokeMethodAsync(
                'BlazorMaui.Core',
                'SubscribeToService',
                'System'
            )

            const result: SubscribeResult = JSON.parse(response)
            if (result.Success) {
                console.log('✅ Subscribed to Counter service')
                await refreshCounter()
            } else {
                console.error('❌ Failed to subscribe:', result.Error)
            }
        } catch (error) {
            console.error('Error subscribing to Counter:', error)
        }
    }

    const refreshCounter = async (): Promise<void> => {
        const result: BlazorResult<number> = await BlazorBridge.call('System', 'GetValue')
        if (result.success && typeof result.data === 'number') {
            counterValue.value = result.data
        }
    }

    const incrementCounter = async (): Promise<BlazorResult> => {
        return await BlazorBridge.call('Counter', 'Increment')
    }

    const decrementCounter = async (): Promise<BlazorResult> => {
        return await BlazorBridge.call('Counter', 'Decrement')
    }

    const resetCounter = async (): Promise<BlazorResult> => {
        return await BlazorBridge.call('Counter', 'Reset')
    }

    const setCounter = async (value: number): Promise<BlazorResult> => {
        return await BlazorBridge.call('Counter', 'SetValue', value)
    }

    return {
        // State
        counterValue,
        isConnected,

        // Getters
        doubleCounter,

        // Actions
        initializeEventBridge,
        subscribeToCounter,
        refreshCounter,
        incrementCounter,
        decrementCounter,
        resetCounter,
        setCounter
    }
})
