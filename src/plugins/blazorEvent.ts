import {defineStore} from 'pinia'
import {ref} from 'vue'
import {EventData, SubscribeResult} from '@/interfaces'

export const useBlazorStore = defineStore('store', () => {

    const counterValue = ref<number>(0)
    console.log('Blazor store initialized')

    const initializeEventBridge = (): void => {
        console.log('Initializing Blazor event bridge...')
        window.blazorEventBridge = {
            onPropertyChanged: (eventDataJson: string): void => {
                console.log('[Blazor Event Bridge] Received event data:', eventDataJson)
                try {
                    const eventData: EventData = JSON.parse(eventDataJson)
                    console.log('[Blazor Event]', eventData)

                    if (eventData.Service === 'System') {
                        switch (eventData.Property) {
                            case 'Value':
                                console.log(`Counter value changed: ${eventData.Value}`)
                                counterValue.value = Number(eventData.Value)
                                break;
                            case 'Alert':
                                console.log(`Alert from Blazor: ${eventData.Value}`)
                                break;
                        }

                    }
                } catch (error) {
                    console.error('Invalid Blazor event data:', error)
                }
            }
        }
    }

    /**
     * Subscribe to a given C# service
     * @param serviceName - Name of the service to subscribe
     */
    const subscribeToService = async (serviceName: string): Promise<boolean> => {
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

        // Blazor bridge
        initializeEventBridge,
        subscribeToService,
    }
})
